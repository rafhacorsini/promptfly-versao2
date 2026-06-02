import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso do site Promptfly e dos produtos digitais oferecidos.",
  alternates: { canonical: "https://promptfly.com.br/termos" },
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <LegalLayout tag="LEGAL" title="Termos de Uso" updatedAt="junho de 2026">
      <p>
        Ao acessar e usar o site <strong>promptfly.com.br</strong> e seus produtos, você
        concorda com estes Termos de Uso. Leia-os com atenção.
      </p>

      <h2>1. Sobre a Promptfly</h2>
      <p>
        A Promptfly é um ecossistema de conteúdo, guias, prompts e templates voltados a
        engenharia de prompt e inteligência artificial. Parte do conteúdo é gratuita e
        parte é oferecida como produto digital pago.
      </p>

      <h2>2. Produtos digitais e pagamento</h2>
      <ul>
        <li>
          Os pagamentos são processados pela <strong>Hotmart</strong>. A compra está
          sujeita também aos termos da Hotmart.
        </li>
        <li>
          Após a confirmação do pagamento, seu acesso ao produto é liberado mediante login
          com o e-mail utilizado na compra.
        </li>
        <li>
          Os produtos têm acesso vitalício, salvo indicação em contrário na página do
          produto.
        </li>
      </ul>

      <h2>3. Direito de arrependimento e reembolso</h2>
      <p>
        Conforme o art. 49 do Código de Defesa do Consumidor, você pode solicitar o
        reembolso em até <strong>7 dias</strong> a contar da compra. As solicitações de
        reembolso são processadas pela Hotmart.
      </p>

      <h2>4. Propriedade intelectual e licença de uso</h2>
      <p>
        O conteúdo, código e templates fornecidos são protegidos por direitos autorais.
        Ao comprar um produto, você recebe uma licença de uso pessoal e profissional dos
        arquivos. <strong>Não é permitido</strong> revender, redistribuir ou compartilhar
        publicamente o código ou os materiais adquiridos.
      </p>

      <h2>5. Uso aceitável</h2>
      <p>
        Você concorda em não tentar burlar mecanismos de pagamento ou acesso, não copiar
        conteúdo pago sem autorização e não usar o site para fins ilícitos.
      </p>

      <h2>6. Limitação de responsabilidade</h2>
      <p>
        O conteúdo é fornecido &quot;como está&quot;, para fins educacionais e
        profissionais. Não garantimos resultados específicos decorrentes do uso dos
        materiais.
      </p>

      <h2>7. Privacidade</h2>
      <p>
        O tratamento dos seus dados é descrito na nossa{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>8. Contato</h2>
      <p>
        Dúvidas sobre estes Termos:{" "}
        <a href="mailto:contato@promptfly.com.br">contato@promptfly.com.br</a>.
      </p>
    </LegalLayout>
  );
}
