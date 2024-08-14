import './style.css'

import { Icon, IconName, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export default function PrivacyRoute() {
  return (
    <div className="flex flex-col justify-between h-screen w-full p-8 mb-10">
      <Link to={'/'} prefetch="intent">
        <div className="flex gap-2 items-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5722 19.5675C17.5786 19.5756 17.5903 19.5769 17.5983 19.5704C18.8904 18.5138 19.9266 17.1695 20.6267 15.6412C21.3295 14.1072 21.6748 12.4292 21.6358 10.7377C21.5967 9.04617 21.1744 7.38675 20.4017 5.88853C19.6319 4.3959 18.5349 3.10333 17.1955 2.11057C17.1872 2.1044 17.1755 2.10627 17.1695 2.11474L16.8097 2.61813C16.8037 2.62659 16.8055 2.63844 16.8138 2.6446C18.0724 3.57771 19.1033 4.79249 19.8268 6.19521C20.5531 7.60356 20.9501 9.16338 20.9868 10.7534C21.0235 12.3434 20.6989 13.9208 20.0383 15.3627C19.3803 16.799 18.4066 18.0624 17.1925 19.0555C17.1845 19.062 17.1832 19.0739 17.1896 19.0821L17.5722 19.5675Z"
              fill="#E5E5E5"
            />
            <path
              d="M16.3132 1.54326C16.3185 1.53425 16.3155 1.52263 16.3067 1.51733C14.9727 0.719854 13.4859 0.222649 11.9465 0.0593706C10.4009 -0.104564 8.83853 0.0719634 7.3658 0.576939C5.89304 1.08191 4.54446 1.90349 3.4118 2.98574C2.28368 4.06368 1.39612 5.37502 0.809011 6.83119C0.805108 6.84087 0.809684 6.85193 0.819213 6.85589L1.38576 7.09064C1.39531 7.0946 1.40616 7.08994 1.41008 7.08026C1.96195 5.71189 2.79611 4.47959 3.85626 3.4666C4.92097 2.44928 6.18866 1.677 7.57302 1.20232C8.9574 0.727645 10.426 0.561709 11.8789 0.715806C13.3256 0.869248 14.7228 1.33642 15.9765 2.08572C15.9853 2.09102 15.9968 2.08803 16.002 2.07903L16.3132 1.54326Z"
              fill="#E5E5E5"
            />
            <path
              d="M0.380453 8.1857C0.370508 8.183 0.360306 8.18905 0.357683 8.19914C0.113567 9.14035 -0.00661751 10.1103 0.000280913 11.0836C0.000355927 11.094 0.00877764 11.1024 0.019069 11.1023L0.630942 11.0965C0.641231 11.0964 0.649488 11.0879 0.649416 11.0774C0.643034 10.1633 0.755913 9.25235 0.985096 8.3683C0.987719 8.35818 0.981796 8.34783 0.971848 8.34513L0.380453 8.1857Z"
              fill="#E5E5E5"
            />
            <path
              d="M0.114765 12.465C0.104572 12.4664 0.0974195 12.4759 0.0988044 12.4863C0.295541 13.9574 0.783179 15.3727 1.53241 16.6469C2.2848 17.9266 3.28535 19.0372 4.47317 19.9114C5.66099 20.7856 7.01133 21.4051 8.44214 21.7321C9.86689 22.0578 11.3418 22.0868 12.778 21.8175C12.7881 21.8156 12.7948 21.8057 12.7929 21.7955L12.6811 21.1838C12.6792 21.1736 12.6695 21.1668 12.6594 21.1687C11.3097 21.4216 9.92367 21.3943 8.58478 21.0882C7.23984 20.7808 5.97051 20.1985 4.85395 19.3767C3.7374 18.555 2.79689 17.511 2.08962 16.3081C1.38556 15.1107 0.927232 13.7807 0.742198 12.3983C0.74081 12.3879 0.731431 12.3806 0.721229 12.382L0.114765 12.465Z"
              fill="#E5E5E5"
            />
            <path
              d="M13.8642 21.5346C13.8671 21.5446 13.8775 21.5504 13.8873 21.5474C14.8318 21.2631 15.7337 20.849 16.568 20.3167C16.5767 20.3111 16.5793 20.2994 16.5738 20.2906L16.2478 19.7642C16.2423 19.7554 16.2308 19.7527 16.2221 19.7583C15.4384 20.2582 14.5913 20.6471 13.7043 20.9143C13.6944 20.9172 13.6888 20.9278 13.6917 20.9378L13.8642 21.5346Z"
              fill="#E5E5E5"
            />
            <path
              d="M18.59 16.4748C15.614 20.8362 9.72285 21.9198 5.4317 18.8952C1.14051 15.8706 0.0742711 9.88307 3.0502 5.52168C6.02613 1.16028 11.9173 0.0766147 16.2085 3.10124C20.4997 6.12585 21.5659 12.1134 18.59 16.4748ZM4.45749 6.51361C2.02057 10.0851 2.89368 14.9881 6.40763 17.4649C9.92158 19.9417 14.7457 19.0543 17.1827 15.4829C19.6196 11.9114 18.7465 7.00835 15.2325 4.53156C11.7186 2.05475 6.89442 2.94214 4.45749 6.51361Z"
              fill="#E5E5E5"
            />
          </svg>
          <svg
            width="101"
            height="14"
            viewBox="0 0 101 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.638672 0.718803H2.31411V13.2815H0.638672V0.718803ZM7.24154 0.718803H9.44055L16.247 11.0457H16.2819V0.718803H17.9574V13.2815H15.8282L8.95188 2.95453H8.91697V13.2815H7.24154V0.718803ZM25.46 2.31575H21.4808V0.718803H31.1146V2.31575H27.1354V13.2815H25.46V2.31575ZM36.0925 0.718803V8.41965C36.0925 8.81001 36.1448 9.21812 36.2495 9.64397C36.3542 10.058 36.5288 10.4424 36.7731 10.7973C37.0174 11.1522 37.3374 11.442 37.733 11.6668C38.1286 11.8915 38.6172 12.0039 39.199 12.0039C39.7807 12.0039 40.2694 11.8915 40.665 11.6668C41.0606 11.442 41.3806 11.1522 41.6249 10.7973C41.8692 10.4424 42.0438 10.058 42.1485 9.64397C42.2532 9.21812 42.3055 8.81001 42.3055 8.41965V0.718803H43.981V8.6858C43.981 9.41922 43.8588 10.0876 43.6145 10.6909C43.3701 11.2823 43.0327 11.7969 42.6022 12.2346C42.1717 12.6723 41.6656 13.0094 41.0839 13.246C40.5021 13.4826 39.8738 13.6009 39.199 13.6009C38.5242 13.6009 37.8959 13.4826 37.3141 13.246C36.7324 13.0094 36.2263 12.6723 35.7958 12.2346C35.3653 11.7969 35.0278 11.2823 34.7835 10.6909C34.5392 10.0876 34.417 9.41922 34.417 8.6858V0.718803H36.0925ZM48.6772 0.718803H50.3526V13.2815H48.6772V0.718803ZM57.863 2.31575H53.8838V0.718803H63.5176V2.31575H59.5384V13.2815H57.863V2.31575ZM67.0469 0.718803H68.7223V13.2815H67.0469V0.718803ZM79.3213 13.6009C78.3789 13.6009 77.5121 13.4352 76.7209 13.104C75.9297 12.761 75.2491 12.2937 74.679 11.7023C74.1205 11.1108 73.6784 10.4129 73.3526 9.60849C73.0384 8.8041 72.8814 7.93465 72.8814 7.00014C72.8814 6.06563 73.0384 5.19618 73.3526 4.39179C73.6784 3.5874 74.1205 2.88947 74.679 2.29801C75.2491 1.70655 75.9297 1.24521 76.7209 0.913987C77.5121 0.570939 78.3789 0.399414 79.3213 0.399414C80.2638 0.399414 81.1306 0.570939 81.9217 0.913987C82.7129 1.24521 83.3878 1.70655 83.9462 2.29801C84.5164 2.88947 84.9585 3.5874 85.2726 4.39179C85.5984 5.19618 85.7613 6.06563 85.7613 7.00014C85.7613 7.93465 85.5984 8.8041 85.2726 9.60849C84.9585 10.4129 84.5164 11.1108 83.9462 11.7023C83.3878 12.2937 82.7129 12.761 81.9217 13.104C81.1306 13.4352 80.2638 13.6009 79.3213 13.6009ZM79.3213 12.0039C80.0311 12.0039 80.671 11.8738 81.2411 11.6135C81.8112 11.3415 82.2999 10.9807 82.7071 10.5312C83.1143 10.0817 83.4285 9.55525 83.6496 8.95196C83.8706 8.33684 83.9811 7.68623 83.9811 7.00014C83.9811 6.31404 83.8706 5.66935 83.6496 5.06605C83.4285 4.45093 83.1143 3.91862 82.7071 3.4691C82.2999 3.01959 81.8112 2.66471 81.2411 2.40447C80.671 2.1324 80.0311 1.99636 79.3213 1.99636C78.6116 1.99636 77.9717 2.1324 77.4016 2.40447C76.8314 2.66471 76.3428 3.01959 75.9355 3.4691C75.5283 3.91862 75.2142 4.45093 74.9931 5.06605C74.772 5.66935 74.6615 6.31404 74.6615 7.00014C74.6615 7.68623 74.772 8.33684 74.9931 8.95196C75.2142 9.55525 75.5283 10.0817 75.9355 10.5312C76.3428 10.9807 76.8314 11.3415 77.4016 11.6135C77.9717 11.8738 78.6116 12.0039 79.3213 12.0039ZM89.9155 0.718803H92.1145L98.921 11.0457H98.9559V0.718803H100.631V13.2815H98.5021L91.6258 2.95453H91.5909V13.2815H89.9155V0.718803Z"
              fill="#E5E5E5"
            />
          </svg>
        </div>
      </Link>
      <div className="max-w-7xl my-6 m-auto">
        <div className="flex flex-row p-6 mb-10 theme-border rounded-xl items-center">
          <Text className="inline-flex gap-2 items-center my-auto text-xl font-bold">
            <Icon name={IconName.lock} className="h-6 w-6" />
            Privacy Policy
          </Text>
        </div>
        <p className="c12">
          <span className="c3">
            PRIVACY POLICY
            <br />
            <br />
          </span>
          <span className="c3 c15">Last Revised on August 8, 2024</span>
        </p>
        <p className="c2">
          <span>The Privacy Policy (this &ldquo;</span>
          <span className="c3">Policy</span>
          <span>&rdquo;) for</span>
          <span>&nbsp;the website portal.intuition.systems (the &ldquo;</span>
          <span className="c3">Portal</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">Website</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">Site</span>
          <span>,&rdquo; or &ldquo;</span>
          <span className="c3">Service</span>
          <span>&rdquo;) applies to the users of the Website (&ldquo;</span>
          <span className="c3">you</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">your</span>
          <span>,&rdquo; or the &ldquo;</span>
          <span className="c3">user</span>
          <span>
            &rdquo;) and the Website&rsquo;s operators Intuition Systems, Inc.{' '}
          </span>
          <span>(&ldquo;</span>
          <span className="c3">we</span>
          <span>,&rdquo; </span>
          <span className="c3">our</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">us</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">Intuition</span>
          <span>,&rdquo; &ldquo;</span>
          <span className="c3">Company</span>
          <span>&rdquo;)</span>
          <span className="c11 c9 c8 c0">
            . This Policy describes how we handle and protect the information
            you provide when using our platform.
          </span>
        </p>
        <p className="c2">
          <span>
            Your privacy is important to us, and this Policy outlines the types
            of information we collect, how we use it, and the measures we take
            to protect it. If you do not agree to the terms of this Policy,
            please do not use the Site, or any of our Services
            <br />
          </span>
        </p>
        <ol className="c10 lst-kix_pcfvvm8tyj4r-0 start" start={1}>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.9n6o8in0sx7x" className="inline">
              <span>
                INFORMATION WE COLLECT AND USE
                <br />
                <br />
              </span>
              <span className="c9 c8 c0 c11">
                We may collect information when you use or enter information on
                our site. We may use the information we collect from you to
                personalize your experience or improve our Website and related
                services in order to better serve you. We may also use collected
                information to internally analyze user metrics and behavior on
                our Website or our user population for marketing or compliance
                purposes.
                <br />
              </span>
            </h1>
          </li>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.tpfvydhmkfss" className="inline">
              <span className="c3">COOKIES</span>
              <span>
                <br />
                <br />
              </span>
              <span className="c0">
                We use cookies for a variety of reasons detailed below.
                Unfortunately in most cases there are no standard options for
                disabling cookies without completely disabling the functionality
                and features they add to this site. It is recommended that you
                leave all{' '}
              </span>
              <span className="c0">on all</span>
              <span className="c0">
                &nbsp;cookies in case they are used to provide a service that
                you use.
                <br />
                <br />
                You can prevent cookies by adjusting the settings on your
                browser, but be aware that disabling cookies will result in
                disabling certain functionality and features of this site.
                Therefore, it is recommended that you do not disable cookies.
                <br />
              </span>
              <span>
                <br />
              </span>
              <span className="c11 c9 c8 c0">
                Types of cookies we may use:
                <br />
              </span>
            </h1>
          </li>
        </ol>
        <ol className="c10 lst-kix_kz8cixy8wsvv-0 start" start={1}>
          <li className="c6 li-bullet-1">
            <span>Login related cookies: </span>
            <span className="c5 c0">
              We use cookies to manage user authentication and use sessions.
              This prevents you from having to log in every single time you
              visit our page.
              <br />
            </span>
          </li>
          <li className="c6 li-bullet-1">
            <span>Essential cookies: </span>
            <span className="c5 c0">
              Essential cookies are essential for our Website to function. They
              allow visitors to move around our Website and use its basic
              features, such as triggering notifications upon completing a
              transaction.
              <br />
            </span>
          </li>
          <li className="c6 li-bullet-2">
            <span className="c0">Personalization cookies: </span>
            <span className="c0 c14">
              These cookies allow us to remember choices you make (such as user
              preferences, themes, and timezones) to provide enhanced, more
              personal features
            </span>
            <span className="c0 c5">
              .<br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_pcfvvm8tyj4r-0" start={3}>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.npy83wqngzl3" className="inline">
              <span className="c3">SECURIT</span>
              <span>
                Y<br />
                <br />
              </span>
              <span className="c0">We value your trust and </span>
              <span className="c0">
                are committed to ensuring that your information is secure
              </span>
              <span className="c0">. </span>
              <span className="c0">
                In order to prevent unauthorized access or disclosure, we have
                put in place suitable physical, electronic and managerial
                procedures to safeguard and secure the information we collect
                online.{' '}
              </span>
              <span className="c11 c9 c8 c0">
                But remember that no method of transmission over the internet,
                or method of electronic storage is 100% secure and reliable, and
                we cannot guarantee its absolute security.
                <br />
              </span>
            </h1>
          </li>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.jaoi2evmx2x1" className="inline">
              <span className="c3">LINKS TO OTHER WEBSITES</span>
              <span>
                <br />
                <br />
              </span>
              <span className="c11 c9 c8 c0">
                Our Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. We have no control over, and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
                <br />
              </span>
            </h1>
          </li>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.2wbkplpg7z8c" className="inline">
              <span className="c3">THIRD-PARTY RESPONSIBILITY</span>
              <span>
                <br />
                <br />
              </span>
              <span className="c11 c9 c8 c0">
                Intuition is not responsible for the data handling practices or
                policies of third-party providers. Users are encouraged to
                review the privacy policies and relevant terms of service of
                these third parties to understand how they manage data or
                interact with us.
                <br />
              </span>
            </h1>
          </li>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.2to4n34d0j0e" className="inline">
              <span className="c3">ONCHAIN AND OFFCHAIN DATA</span>
              <span>
                <br />
                <br />
              </span>
              <span className="c0">
                Use of our Service to create and share content results in the
                creation of both offchain and{' '}
              </span>
              <span className="c0">onchain</span>
              <span className="c0">
                &nbsp;data. Through use of our Service, users acknowledge and
                accept the inherent risks associated with creating public
                content.
                <br />
                <br />O
              </span>
              <span className="c0">nchain</span>
              <span className="c0">
                &nbsp;data is immutable and offchain data may be stored using
                decentralized services. We can hide content from the
                Service&rsquo;s user interface that violates our Terms of Use,
                but{' '}
              </span>
              <span className="c0">onchain</span>
              <span className="c0">
                &nbsp;data is immutable and remains on the blockchain while{' '}
              </span>
              <span className="c0">offchain</span>
              <span className="c11 c9 c8 c0">
                &nbsp;data may potentially persist on third party storage.
                <br />
                <br />
                The Portal is a neutral platform that enables the creation,
                sharing and interaction with user-created content. We don&#39;t
                control nor endorse and are not liable for content created by
                users or third parties. Users are accountable for their content
                and must ensure legal and best practice compliance. By using our
                Service, users indemnify Intuition against any claims, damages,
                or legal actions arising from their attestations or misuse of
                the Portal.
                <br />
              </span>
            </h1>
          </li>
          <li className="c1 c4 li-bullet-0">
            <h1 id="h.jt67xz3hl6rl" className="inline">
              <span className="c3">
                PERSONAL INFORMATION
                <br />
              </span>
            </h1>
          </li>
        </ol>
        <ol className="c10 lst-kix_pcfvvm8tyj4r-1 start" start={1}>
          <li className="c7 li-bullet-3">
            <span>
              You acknowledge and agree that information supplied in these terms
              may relate to individuals (collectively &ldquo;
            </span>
            <span className="c3">Personal Information</span>
            <span className="c11 c9 c8 c0">
              &rdquo;), may be held by the Company and/or its delegates and
              agents and may be used for the purpose of:
              <br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_xms2ljyf2a0l-0 start" start={1}>
          <li className="c6 li-bullet-1">
            <span className="c11 c9 c8 c0">
              completion of information on statutory registers and books and
              other related dealings, including performing know-your-client
              procedures and overseeing these processes; <br />
            </span>
          </li>
          <li className="c6 li-bullet-1">
            <span className="c11 c9 c8 c0">
              carrying out the provisions of these terms; <br />
            </span>
          </li>
          <li className="c6 li-bullet-1">
            <span className="c11 c9 c8 c0">
              responding to any enquiry purporting to be given by you or on
              behalf of you; <br />
            </span>
          </li>
          <li className="c6 li-bullet-1">
            <span className="c11 c9 c8 c0">
              dealing in any other matters relating to the Company&rsquo;s
              general business administration (including the mailing of reports
              or notices, communicating with service providers and
              counterparties, accountancy and audit services, risk monitoring,
              the administration of IT systems and monitoring and improving
              products); and <br />
            </span>
          </li>
          <li className="c6 li-bullet-2">
            <span className="c11 c9 c8 c0">
              observing any legal, governmental, regulatory requirements of any
              relevant jurisdiction (including any disclosure or notification
              requirements to which any recipient of the data is subject,
              know-your-client procedures, the automatic exchange of tax
              information and legal judgments).
              <br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_pcfvvm8tyj4r-1 start" start={1}>
          <li className="c7 li-bullet-4">
            <span className="c11 c9 c8 c0">
              You give your express consent to the use of your Personal
              Information as set out at Section 7.1 above. <br />
            </span>
          </li>
          <li className="c7 li-bullet-3">
            <span className="c8 c0">
              If you are not an individual, you confirm, represent and warrant
              that y
            </span>
            <span className="c9 c8 c0">
              ou have obtained consent from any individual whose Personal
              Information has been provided to the Company or its delegates and
              agents for that Personal Information to be provided to the
              Company, its delegates and agents.
            </span>
            <span className="c0">
              &nbsp;
              <br />
            </span>
          </li>
          <li className="c7 li-bullet-5">
            <span className="c0 c8">
              You acknowledge and agree that, subject to the requirements of
              applicable law, the Company and/or its delegates and agents, may:
              <br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_khxbhic88mhe-0 start" start={1}>
          <li className="c6 c4 li-bullet-1">
            <h1 id="h.gsek5oqlef0y" className="inline">
              <span className="c9 c8 c0">
                retain Personal Information after your use of the Services;
                <br />
              </span>
            </h1>
          </li>
          <li className="c6 li-bullet-2">
            <span className="c8 c9">
              maintain Personal Information on computer systems based or
              maintained in such places as the Company and/or its delegate or
              agent determines, which may be in countries that have not enacted
              data protection legislation;
              <br />
            </span>
          </li>
          <li className="c6 li-bullet-2">
            <span className="c9 c8">
              disclose and transfer Personal Information, by any method
              including electronically and/or by making available the original
              or a copy of these terms, to:
              <br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_khxbhic88mhe-1 start" start={1}>
          <li className="c13 li-bullet-4">
            <span className="c9 c8">
              the Company and/or any delegate or agent of the Company{' '}
            </span>
            <span>&ndash;</span>
            <span className="c9 c8">
              and/or the professional advisers of any of them and/or any of{' '}
            </span>
            <span>&ndash;</span>
            <span className="c9 c8">
              their employees, officers, directors, agents and/or affiliates; or
              <br />
            </span>
          </li>
          <li className="c13 li-bullet-3">
            <span className="c11 c9 c8 c0">
              any third party employed to provide administrative, computer or
              other services or facilities to any person to whom data is
              disclosed or transferred as aforesaid; or
              <br />
            </span>
          </li>
          <li className="c13 li-bullet-4">
            <span className="c11 c9 c8 c0">
              disclose Personal Information where such disclosure is required by
              any law or order of any court or pursuant to any direction,
              request or requirement (whether or not having the force of law) of
              any central bank or governmental or other regulatory or taxation
              authority.
              <br />
            </span>
          </li>
        </ol>
        <ol className="c10 lst-kix_pcfvvm8tyj4r-0" start={8}>
          <li className="c1 li-bullet-0">
            <span className="c3">CHILDREN&rsquo;S PRIVACY</span>
            <span>
              <br />
              <br />
            </span>
            <span className="c11 c9 c8 c0">
              We do not knowingly market to nor collect personal identifiable
              information from children under 13. In the case we discover that a
              child under 13 has provided us with personal information, please
              contact us so that we can investigate.
              <br />
            </span>
          </li>
          <li className="c1 li-bullet-0">
            <span className="c3">
              UPDATES TO THIS POLICY
              <br />
              <br />
            </span>
            <span className="c11 c9 c8 c0">
              We may periodically update this Privacy Policy. Users are
              encouraged to review it regularly to stay informed about our data
              practices.
              <br />
            </span>
          </li>
          <li className="c1 li-bullet-0 mb-20">
            <span className="c3">
              CONTACT US
              <br />
              <br />
            </span>
            <span>
              For any inquiries, concerns, or requests related to this Policy,
              please contact us at support@intuition.systems.
            </span>
          </li>
        </ol>
      </div>
    </div>
  )
}
