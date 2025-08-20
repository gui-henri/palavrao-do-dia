import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="p-4 gap-3 flex flex-col items-center w-full text-center">
            <div className="max-w-128">
                <Link href="/" className="underline p-2">Voltar para página inicial</Link>
                <h1 id="pol-tica-de-privacidade" className="text-4xl">Política de Privacidade</h1>
                <p>Última atualização: 20 de agosto de 2025</p>
                <p className="p-4">Esta Política de Privacidade explica como o Palavrão do Dia (“nós”, “nosso”) coleta, usa e protege suas informações pessoais quando você utiliza nosso aplicativo.</p>
                <p className="p-4">Ao usar o Palavrão do Dia, você concorda com a coleta e o uso de informações de acordo com esta política.</p>
                <h2 id="1-coleta-de-informa-es" className="p-4 text-3xl">1. Coleta de Informações</h2>
                <p className="p-4">Para proporcionar uma experiência personalizada e segura, utilizamos o serviço de login do Google. Ao optar por fazer login em nosso aplicativo através de sua conta Google, você nos autoriza a coletar as seguintes informações do seu perfil:</p>
                <ul >
                    <li><p><b>Nome</b>: Utilizamos seu nome para personalizar sua experiência dentro do aplicativo, como em saudações e na identificação do seu perfil. Além disso, ele é mostrado publicamente junto a publicações do usuário.</p>
                    </li>
                    <li><p><b>Foto de perfil</b>: Utilizamos apenas para personalizar sua experiência do aplicativo, como no botão de gerenciamento da conta. Não coletamos sua foto, temos acesso a ela apenas enquanto você está usando o aplicativo.</p>
                    </li>
                    <li><p><b>Email</b>: Temos acesso ao seu email apenas durante o uso na plataforma, mas na data desta atualização não o utilizamos em nenhuma capacidade e nem coletamos internamente. </p>
                    </li>
                </ul>
                <p className="p-4">Não coletamos informações adicionais da sua conta Google além das mencionadas acima. O processo de autenticação é gerenciado pelo Google e pela plataforma Clerk, e não temos acesso à sua senha ou a outras informações sensíveis da sua conta.</p>
                <h2 id="2-uso-das-informa-es" className="p-4  text-3xl">2. Uso das Informações</h2>
                <p className="p-4">As informações que coletamos são utilizadas exclusivamente para os seguintes fins:</p>
                <ul>
                    <li><p><b>Criação e gerenciamento da sua conta</b>: Seu nome é utilizado para identificar sua conta em nossa plataforma.</p>
                    </li>
                    <li><p><b>Personalização da experiência</b>: Exibimos seu nome em áreas designadas do aplicativo para criar um ambiente mais pessoal.</p>
                    </li>
                    <li><p><b>Comunicação</b>: Podemos usar as informações para entrar em contato com você a respeito de atualizações importantes sobre o aplicativo ou sua conta.</p>
                    </li>
                </ul>
                <h2 id="3-n-o-compartilhamento-e-n-o-venda-de-dados" className="p-4  text-3xl">3. Não Compartilhamento e Não Venda de Dados</h2>
                <p className="p-4">As informações pessoais coletadas (seu nome) não serão, sob nenhuma circunstância, vendidas, alugadas, trocadas ou compartilhadas com terceiros para fins de marketing ou qualquer outro fim não descrito explicitamente nesta política.</p>
                <p className="p-4">O acesso às suas informações é restrito à nossa equipe e somente quando estritamente necessário para a manutenção e melhoria dos nossos serviços.</p>
                <h2 id="4-seguran-a-dos-dados" className="p-4  text-3xl">4. Segurança dos Dados</h2>
                <p className="p-4">Empregamos medidas de segurança padrão do setor para proteger suas informações contra acesso, alteração, divulgação ou destruição não autorizada. No entanto, é importante ressaltar que nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro.</p>
                <h2 id="5-seus-direitos" className="p-4  text-3xl">5. Seus Direitos</h2>
                <p className="p-4">De acordo com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis, você tem o direito de:</p>
                <ul>
                    <li><p>Acessar as informações que temos sobre você.</p>
                    </li>
                    <li><p>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</p>
                    </li>
                    <li><p>Solicitar a exclusão da sua conta e das suas informações de nossos sistemas.</p>
                    </li>
                </ul>
                <p className="p-4">Para exercer esses direitos, entre em contato conosco através do e-mail: guihenrique.dev@gmail.com.</p>
                <h2 className="p-4  text-3xl" id="6-altera-es-a-esta-pol-tica-de-privacidade">6. Alterações a Esta Política de Privacidade</h2>
                <p className="p-4">Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página. Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações. As alterações a esta Política de Privacidade são efetivas quando publicadas nesta página.</p>
                <ol>
                    <li>Contato
                        Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato:</li>
                </ol>
                <p>Por e-mail: guihenrique.dev@gmail.com
                    Pelo X: @palavraododia</p>

            </div>
        </div>
    )
}