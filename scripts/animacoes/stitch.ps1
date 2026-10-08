# Junta os frames de cada demo numa sprite vertical (JPEG) + um poster.
# Rode na raiz do projeto, depois do capture.mjs. Windows (usa System.Drawing).
param([string[]]$Slugs)
Add-Type -AssemblyName System.Drawing
$frames = Join-Path $env:TEMP "promptfly-animacoes-frames"
$out = Join-Path (Get-Location) "public/animacoes"
New-Item -ItemType Directory -Force $out | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
function Save-Jpeg($img, $file, $q) {
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
  $img.Save($file, $codec, $p)
}
if (-not $Slugs) { $Slugs = Get-ChildItem $frames -Directory | ForEach-Object Name }
foreach ($slug in $Slugs) {
  $files = Get-ChildItem "$frames\$slug\f*.jpg" | Sort-Object Name
  $first = [System.Drawing.Image]::FromFile($files[0].FullName)
  $w = $first.Width; $h = $first.Height; $first.Dispose()
  $sprite = New-Object System.Drawing.Bitmap $w, ($h * $files.Count)
  $g = [System.Drawing.Graphics]::FromImage($sprite)
  for ($i = 0; $i -lt $files.Count; $i++) {
    $f = [System.Drawing.Image]::FromFile($files[$i].FullName)
    $g.DrawImage($f, 0, $i * $h, $w, $h); $f.Dispose()
  }
  $g.Dispose()
  Save-Jpeg $sprite "$out\$slug.jpg" 62
  $sprite.Dispose()
  # Poster: frame a ~60% da sequência (já com a animação em andamento).
  $posterSrc = [System.Drawing.Image]::FromFile($files[[int]($files.Count * 0.6)].FullName)
  Save-Jpeg $posterSrc "$out\$slug-poster.jpg" 80
  $posterSrc.Dispose()
  $kb = [int]((Get-Item "$out\$slug.jpg").Length / 1024)
  "$slug : $($files.Count) frames, sprite ${kb} KB"
}
