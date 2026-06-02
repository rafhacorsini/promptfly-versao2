#!/usr/bin/env python3
"""Gera o PDF de boas-vindas do Promptfly Premium (sem dependencias)."""
import textwrap, zlib, struct

WIDTH, HEIGHT = 595, 842  # A4 em pts
MARGIN = 64

# (texto, fonte, tamanho, cor_rgb, espaco_abaixo, wrap_chars)
ACCENT = (1.0, 0.298, 0.0)   # #FF4C00
DARK = (0.10, 0.10, 0.10)
GRAY = (0.45, 0.45, 0.45)
TEXT = (0.17, 0.17, 0.17)

ops = []  # operacoes do content stream
y = HEIGHT - MARGIN


def set_color(c):
    ops.append(f"{c[0]:.3f} {c[1]:.3f} {c[2]:.3f} rg")


def esc(s):
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


def line(text, font="F1", size=11, color=TEXT, gap=6, wrap=78, leading=15):
    global y
    chunks = textwrap.wrap(text, wrap) or [""]
    set_color(color)
    for ch in chunks:
        ops.append("BT")
        ops.append(f"/{font} {size} Tf")
        ops.append(f"{leading} TL")
        ops.append(f"1 0 0 1 {MARGIN} {y:.1f} Tm")
        ops.append(f"({esc(ch)}) Tj")
        ops.append("ET")
        y -= leading
    y -= gap


def rule(gap=14):
    global y
    set_color((0.88, 0.88, 0.88))
    ops.append(f"{MARGIN} {y:.1f} m {WIDTH - MARGIN} {y:.1f} l 0.7 w S")
    y -= gap


def space(px):
    global y
    y -= px


# ---- conteudo ----
line("PROMPTFLY PREMIUM", "F2", 9, ACCENT, gap=4, wrap=90, leading=11)
line("Bem-vindo. Seu acesso esta liberado.", "F2", 22, DARK, gap=10, wrap=40, leading=26)
rule(16)

line("Obrigado por entrar para o Promptfly Premium. Voce agora tem acesso "
     "vitalicio a todos os templates premium e ao grupo exclusivo do @rafha.gpt.",
     "F1", 11.5, TEXT, gap=18, leading=16)

line("COMO ACESSAR", "F2", 10, ACCENT, gap=8, leading=12)
line("1.  Acesse  promptfly.com.br/projetos", "F2", 12, DARK, gap=4, leading=16)
line("2.  Clique em \"Ja comprou? Entrar\" e digite o e-mail desta compra.",
     "F1", 11.5, TEXT, gap=4, leading=16)
line("3.  Voce recebera um link de acesso por e-mail. Clique nele.",
     "F1", 11.5, TEXT, gap=4, leading=16)
line("4.  Pronto: todos os templates destravam e o link do grupo aparece "
     "na sua area logada.", "F1", 11.5, TEXT, gap=18, leading=16)

line("O QUE VOCE TEM", "F2", 10, ACCENT, gap=8, leading=12)
line("-  Todos os templates e prompts premium, prontos para copiar.",
     "F1", 11.5, TEXT, gap=4, leading=16)
line("-  Novos templates incluidos, sem pagar de novo.",
     "F1", 11.5, TEXT, gap=4, leading=16)
line("-  Acesso ao grupo exclusivo do @rafha.gpt.",
     "F1", 11.5, TEXT, gap=4, leading=16)
line("-  Acesso vitalicio.", "F1", 11.5, TEXT, gap=22, leading=16)

rule(14)
line("Use sempre o mesmo e-mail da compra para entrar.", "F1", 10, GRAY, gap=2, leading=13)
line("Duvidas? contato@promptfly.com.br", "F1", 10, GRAY, gap=2, leading=13)

# ---- monta o PDF ----
content = "\n".join(ops).encode("latin-1")
compressed = zlib.compress(content)

objs = []
objs.append(b"<< /Type /Catalog /Pages 2 0 R >>")
objs.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
objs.append(
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
    b"/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>"
)
objs.append(
    b"<< /Length %d /Filter /FlateDecode >>\nstream\n" % len(compressed)
    + compressed + b"\nendstream"
)
objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

pdf = b"%PDF-1.4\n"
offsets = []
for i, o in enumerate(objs, start=1):
    offsets.append(len(pdf))
    pdf += b"%d 0 obj\n" % i + o + b"\nendobj\n"

xref_pos = len(pdf)
pdf += b"xref\n0 %d\n" % (len(objs) + 1)
pdf += b"0000000000 65535 f \n"
for off in offsets:
    pdf += b"%010d 00000 n \n" % off
pdf += b"trailer\n<< /Size %d /Root 1 0 R >>\n" % (len(objs) + 1)
pdf += b"startxref\n%d\n%%%%EOF" % xref_pos

out = "/mnt/c/Users/Rafhael/Downloads/promptfly-premium-boas-vindas.pdf"
with open(out, "wb") as f:
    f.write(pdf)
print("PDF gerado em:", out, "(%d bytes)" % len(pdf))
