import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Promptfly coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "https://promptfly.com.br/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalLayout tag="LEGAL" title="Política de Privacidade" updatedAt="junho de 2026">
      <p>
        Esta Política de Privacidade descreve como a <strong>Promptfly</strong>{" "}
        (&quot;nós&quot;) coleta, utiliza, armazena e protege os dados pessoais dos
        usuários (&quot;você&quot;) do site promptfly.com.br, em conformidade com a
        <strong> Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD)</strong>.
      </p>

      <h2>1. Controlador dos dados</h2>
      <p>
        O responsável pelo tratamento dos seus dados é a Promptfly. Para qualquer
        questão sobre privacidade, entre em contato pelo e-mail{" "}
        <a href="mailto:contato@promptfly.com.br">contato@promptfly.com.br</a>.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>E-mail:</strong> quando você assina a newsletter ou faz login para
          acessar projetos adquiridos.
        </li>
        <li>
          <strong>Dados de compra:</strong> ao adquirir um produto, o pagamento é
          processado pela Hotmart, que nos informa o e-mail e o produto comprado para
          liberarmos seu acesso. Não recebemos nem armazenamos dados do seu cartão.
        </li>
        <li>
          <strong>Dados de navegação (cookies de análise):</strong> páginas visitadas e
          informações de uso, coletados apenas mediante o seu consentimento.
        </li>
      </ul>

      <h2>3. Para que usamos seus dados</h2>
      <ul>
        <li>Enviar a newsletter e comunicações que você solicitou;</li>
        <li>Liberar e gerenciar o acesso aos projetos que você comprou;</li>
        <li>Autenticar seu login por meio de link enviado ao seu e-mail;</li>
        <li>Entender o uso do site e melhorar a experiência (análise);</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>

      <h2>4. Base legal</h2>
      <p>
        Tratamos seus dados com base no seu <strong>consentimento</strong> (newsletter e
        cookies de análise), na <strong>execução de contrato</strong> (liberação de
        produtos comprados e login) e no <strong>cumprimento de obrigação legal</strong>,
        conforme o art. 7º da LGPD.
      </p>

      <h2>5. Compartilhamento com terceiros</h2>
      <p>Compartilhamos dados apenas com prestadores essenciais à operação:</p>
      <ul>
        <li>
          <strong>Hotmart</strong> — processamento de pagamentos;
        </li>
        <li>
          <strong>Beehiiv</strong> — envio da newsletter;
        </li>
        <li>
          <strong>Resend</strong> — envio dos e-mails de login;
        </li>
        <li>
          <strong>Vercel</strong> e <strong>Upstash</strong> — hospedagem e armazenamento
          técnico;
        </li>
        <li>
          <strong>Vercel Analytics</strong> — análise de uso (somente com consentimento).
        </li>
      </ul>
      <p>Não vendemos seus dados pessoais a ninguém.</p>

      <h2>6. Cookies</h2>
      <p>
        Usamos cookies estritamente necessários ao funcionamento do site e, mediante seu
        consentimento, cookies de análise. Você pode aceitar ou recusar os cookies de
        análise no aviso exibido ao entrar no site, e alterar sua escolha a qualquer
        momento limpando os dados do navegador.
      </p>

      <h2>7. Por quanto tempo guardamos</h2>
      <p>
        Mantemos seus dados pelo tempo necessário às finalidades acima ou enquanto durar
        a relação com você. Você pode solicitar a exclusão a qualquer momento.
      </p>

      <h2>8. Seus direitos</h2>
      <p>Nos termos do art. 18 da LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados;</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados;</li>
        <li>Revogar o consentimento;</li>
        <li>Solicitar a portabilidade dos seus dados.</li>
      </ul>
      <p>
        Para exercer seus direitos, escreva para{" "}
        <a href="mailto:contato@promptfly.com.br">contato@promptfly.com.br</a>.
      </p>

      <h2>9. Alterações nesta política</h2>
      <p>
        Podemos atualizar esta Política periodicamente. A data da última atualização está
        indicada no topo desta página.
      </p>
    </LegalLayout>
  );
}
