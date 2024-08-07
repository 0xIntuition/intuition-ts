import './style.css'

import { Icon, IconName, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export default function TermsRoute() {
  return (
    <div className="flex flex-col justify-between h-screen w-full p-8">
      <Link to={'/app'} prefetch="intent">
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
            <Icon name={IconName.folder} className="h-6 w-6" />
            Terms and Conditions
          </Text>
        </div>
        <div className="px-6">
          <p className="c0">
            <span className="c5">Terms of Use</span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              INTUITION PORTAL USES A SUITE OF EXPERIMENTAL BLOCKCHAIN-ORIENTED
              FUNCTIONALITIES. USING THESE FUNCTIONALITIES (INCLUDING VIA THE
              INTERFACE ON OUR WEBSITE) POSES SIGNIFICANT RISKS TO YOU AND YOUR
              ONLINE ASSETS. THIS DOCUMENT CONTAINS VERY IMPORTANT INFORMATION
              REGARDING THESE RISKS AND YOUR RIGHTS AND OBLIGATIONS, AS WELL AS
              CONDITIONS, LIMITATIONS, AND EXCLUSIONS THAT MIGHT APPLY TO YOU
              AND YOUR RIGHTS. PLEASE READ IT CAREFULLY. THESE TERMS REQUIRE THE
              USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES,
              RATHER THAN JURY TRIALS OR CLASS ACTIONS. BY USING THE WEBSITE OR
              OUR SERVICES, YOU ACCEPT AND ARE BOUND BY THESE TERMS AND
              CONDITIONS. YOU MAY NOT USE OUR WEBSITE OR SERVICES IF YOU: (A) DO
              NOT AGREE TO THESE TERMS; (B) ARE NOT THE OLDER OF (i) AT LEAST
              EIGHTEEN (18) YEARS OF AGE; OR (ii) LEGAL AGE TO FORM A BINDING
              CONTRACT; OR (C) ARE PROHIBITED FROM ACCESSING OR USING THIS
              WEBSITE OR ANY OF THIS WEBSITE&rsquo;S FUNCTIONALITIES BY THESE
              TERMS OR BY APPLICABLE LAW.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              1. &nbsp;Acceptance of These Terms of Use
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              These terms of use are entered into by and between you
              (&ldquo;you&rdquo; or the &ldquo;User&rdquo;) and Intuition
              Systems Inc (&ldquo;Intuition,&rdquo; &ldquo;we,&rdquo;
              our,&rdquo; &ldquo;us&rdquo;). The following terms and conditions,
              together with any documents they expressly incorporate by
              reference (collectively, these &ldquo;Terms of Use&rdquo; or this
              &ldquo;Agreement&rdquo;), govern the User&rsquo;s access to and
              use of Intuition Portal and its sub-pages, including any content
              or functionality offered on or through the website-hosted user
              interface (the &ldquo;Interface,&rdquo; or the
              &ldquo;Website&rdquo;). The User must read these Terms of Use
              carefully before using the Website (including the Interface).
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span>
              By using the Website or the Interface, the User accepts and agrees
              to be bound and abide by these Terms of Use and all documents
              incorporated herein by reference. If the User does not want to
              agree to these Terms of Use or any documents that are incorporated
            </span>
            <span className="c1">
              &nbsp;herein by reference, the User must not access the Website or
              use the Interface.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              The Website is offered and available to users who are eighteen
              (18) years of age or older. By using this Website, the User
              represents and warrants that the User is at least the higher of
              legal age to form a binding contract with Intuition in the
              User&rsquo;s applicable jurisdiction or eighteen (18) years of
              age, and meets all of the foregoing eligibility requirements.
              Further, by using this Website, the User represents and warrants
              that the User is not a citizen or resident of, nor is located in,
              any country where the use of the Website is illegal or
              impermissible, whether by rule, statute, regulation, bylaw, court
              adjudication or order, protocol, administrative statement, code,
              decree, or other directive, requirement or guideline, whether
              applicable on Intuition, the Website, the Interface, the Protocol
              (as defined herein), or on the User (or any combination of the
              foregoing) by an authority with valid and enforceable jurisdiction
              (&ldquo;Applicable Laws&rdquo;). If you do not meet all of these
              requirements, you must not access or use the Website.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              2. &nbsp;The Services and Protocol; Blockchain Fees
            </span>
          </p>
          <p className="c0">
            <span>
              <br />
            </span>
            <span>
              The Website&rsquo;s services (the &ldquo;Services&rdquo;) include
              without limitation providing methods and information to enable
              those who access the Website (&ldquo;Participants&rdquo;) to
              access to or participate in the Intuition attestation and data
              market mechanisms powered by blockchain-enforced smart contracts
              (the &ldquo;Intuition Protocol,&rdquo; or &ldquo;Protocol&rdquo;).
              The Protocol is intended to be provided and operate in a
              decentralized manner, meaning that Intuition has no ability to
              control, modify, prevent, stop, amend, or adjust interactions or
              transactions after they are submitted to the Protocol, whether or
              not through the Interface. Further, the Interface is not the only
              method that individuals or parties may interact with, contribute
              to, access, or otherwise affect the Protocol. Thus, the Services
              (including the Website and the Interface) are distinct from the
              Protocol, and any of the Protocol&rsquo;s products or offerings
              should not be viewed as products or offerings provided by the
              Website. You are expected to be familiar with the Protocol and the
              risks it represents (including without limitation the possibility
              of your crypto-assets being forfeited according to the
              Protocol&rsquo;s rules or being lost for any other reason) before
              accessing it (whether accessed via the Interface or otherwise).
              YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OR INTERACTION WITH THE
              PROTOCOL IS AT YOUR OWN RISK AND INTUITION WAIVES ALL LIABILITY OR
              RESPONSIBILITY, AND MAKES NO WARRANTIES, RELATED TO THE PROTOCOL,
              WHETHER OR NOT THE PROTOCOL IS ACCESSED VIA OUR SERVICES.
            </span>
            <span className="c5 c6">
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              Your full use and enjoyment of the Services (whether or not by
              using the Interface) may require you to pay transactional fees
              required by their underlying blockchain or distributed ledger
              service, or by the Protocol itself, that are designed to encourage
              their intended use among the Protocol&rsquo;s participants
              (&ldquo;Blockchain Fees&rdquo;). You acknowledge that in no event
              will Intuition be responsible to you or any other part for the
              payment, repayment, refund, disbursement, indemnity, or for any
              other aspect of your use or transmission of Blockchain Fees. For
              further information regarding blockchain technology, crypto-assets
              and the associated risks, see Nature of Blockchain; Assumption of
              Risk; Waiver of Claims.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              3. &nbsp;Accessing the Website and User Security
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              We reserve the right to withdraw or amend the Website (including
              the Interface), and any other Services or material we provide on
              the Website, in our sole discretion without notice. We will not be
              liable if for any reason all or any part of the Website, the
              Interface, the Protocol, or any of the Services are unavailable at
              any time or for any period. From time to time, we may restrict
              access to some parts of the Website, or the entire Website, to
              Participants.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              The User is responsible for both:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_hobv8zb2zu32-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Making all arrangements necessary for the User to have access to
                the Website and the Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Ensuring that all persons who access the Website or the Services
                through the User&rsquo;s internet connection are aware of these
                Terms of Use and comply with them.
                <br />
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              To access certain Services or some of the resources offered on the
              Website, the User may be asked to provide certain registration
              details or other information. Other Services or resources offered
              on the Website (such as the Interface) may require the User to
              utilize certain Web3 capabilities, such a crypto-asset wallet
              capable of interacting with the User&rsquo;s web browser or
              relevant blockchain nodes (&ldquo;Web3 Utilities&rdquo;). It is a
              condition of the User&rsquo;s use of the Website and the Services
              that the User only operate such Web3 Utilities with a private
              key(s) that the User created or has the direct, explicit
              permission of the party who created the relevant private key(s).
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              The User agrees that all information it provides to interact with
              the Website, Interface, Services, or otherwise, including, but not
              limited to, through the use of any interactive features on the
              Website is correct, current, and complete. The User consents to
              all actions we take with respect to the User&rsquo;s information
              as is consistent with these Terms of Use and all documents
              referenced or incorporated herein.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              If the User utilizes a Web3 Utility that relies on a separate
              username, password, private key, or any other piece of information
              as part of its security procedures, the User must treat such
              information as confidential, and the User must not disclose that
              information to any other person or entity. The User also
              acknowledges that any identity linked to its Web3 Utility is
              personal to the User and agrees not to provide any other person
              with access to such identity. The User also agrees to ensure that
              it will lock or otherwise prevent its Web3 Utility from
              unauthorized use on this Website or the Services at the end of
              each session. The User should use particular caution when
              accessing the Website or the Services from a public or shared
              computer so that others are not able to view or record the
              User&rsquo;s username, password, private key, or other personal
              information. In the event the User&rsquo;s Web3 credentials are
              compromised, the User acknowledges and understands that all of its
              related crypto-assets may be compromised as well, and waives any
              and all responsibility of and liability against Intuition related
              to any losses in any such event.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span>
              4. &nbsp;Prohibited Uses
              <br />
              <br />
              Intuition Portal
            </span>
            <span>
              &nbsp;is a user interface for displaying content created by other
              users. We do not verify, endorse, or assume responsibility for any
              content, contracts, or applications introduced or created by
              users. Users must exercise caution and conduct their due diligence
              before interacting with any contracts or applications.
            </span>
            <span className="c1">
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              The User may access or use the Website and the Services only for
              lawful purposes and in accordance with these Terms of Use. The
              User agrees not to use or access the Website or the Services:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_b7khnf267911-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                In any way that violates any applicable federal, state, local,
                or international law or regulation (including, without
                limitation, any laws regarding the export of data or software to
                and from the US or other countries).
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                For the purpose of exploiting, harming, or attempting to exploit
                or harm minors in any way by exposing them to inappropriate
                content, asking for personally identifiable information, or
                otherwise.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To transmit, or procure the sending of, any advertising or
                promotional material, including any &ldquo;junk mail,&rdquo;
                &ldquo;chain letter,&rdquo; &ldquo;spam,&rdquo; or any other
                similar solicitation.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To impersonate or attempt to impersonate a specific individual
                Intuition contributor, another user, or any other person or
                entity (including, without limitation, by using email addresses,
                screen names, similarly named or commonly misspelled URLs, or
                associated blockchain identities).
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To engage in any other conduct that restricts or inhibits
                anyone&rsquo;s use or enjoyment of the Website or the Services,
                or which, as determined by us, may harm Intuition or
                Participants, or expose them to liability.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span>
                If they are a citizen of or otherwise accessing the Website from
                Burma (Myanmar), Cuba, Iran, Sudan, Syria, the Western Balkans,
                Belarus, C&ocirc;te d&rsquo;Ivoire, Democratic Republic of the
                Congo, Iraq, Lebanon, Liberia, Libya, North Korea, Russia,
                certain sanctioned areas of Ukraine, Somalia, Venezuela, Yemen,
                or Zimbabwe (collectively, &ldquo;Prohibited
                Jurisdictions&rdquo;), or if the User is otherwise listed as a
                Specially Designated National by the United States Office of
                Foreign Asset Control (&ldquo;
              </span>
              <span className="c5">OFAC</span>
              <span className="c1">&rdquo;).</span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                If doing so is illegal or impermissible according to any
                Applicable Laws.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To cause the Services, any of the Services&rsquo; underlying
                blockchain networks or technologies, or any other functionality
                with which the Services interact to work other than as intended.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To take any action that may be reasonably construed as fraud,
                deceit, or manipulation.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                To damage the reputation of Intuition or impair any of
                Intuition&rsquo;s legal rights or interests.
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              <br />
              Additionally, the User agrees not to:
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <ul className="c3 lst-kix_uracdijlke84-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Be likely to deceive or defraud, or attempt to deceive or
                defraud, any person, including (without limitation) providing
                any false, inaccurate, or misleading information (whether
                directly through the Services or through an external means that
                affects the Protocol) with the intent to unlawfully obtain the
                property of another or to provide knowingly or recklessly false
                information, including in any way that causes inaccuracy among
                the content on the Website or on the Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use the Services to manipulate or defraud any DEX, oracle
                system, the Protocol, or blockchain network, or the users
                thereof.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Promote any illegal activity, or advocate, promote, or assist
                any unlawful act.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Cause needless annoyance, inconvenience, or anxiety, or be
                likely to unreasonably upset, embarrass, alarm, or annoy any
                other person.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Impersonate any person, or misrepresent the User&rsquo;s
                affiliation with any person or organization in connection with
                its use of the Website and Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Engage in any activity or behavior that violates any applicable
                law, rule, or regulation concerning, or otherwise damages, the
                integrity of the Website or the Services, or any other service
                or software which relies on the Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Give the impression that they emanate from or are endorsed by us
                or any other person or entity if this is not the case.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use the Website in any manner that could disable, overburden,
                damage, impair, or interfere with any other party&rsquo;s use of
                the Website, including the ability to engage in real time
                activities through the Website or with the Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use any robot, spider, or other similar automatic device,
                process, or means to access the Website for any purpose,
                including monitoring or copying any of the material on the
                Website.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use any manual process to copy any of the material on the
                Website, or for any other purpose not expressly authorized in
                these Terms of Use, without our prior written consent.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use any device, software, or routine that interferes with the
                proper working of the Website or the Services.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Circumnavigate, by any means, any restriction we may have
                implemented to prohibit impermissible access to citizens and
                residents of, or Participants physically located in, any
                Prohibited Jurisdiction.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Introduce any viruses, Trojan horses, worms, logic bombs, or
                other material that is malicious or technologically harmful to
                the Website, the Services, the Participants, any underlying
                blockchain, or any of the Service&rsquo;s related utilities or
                functionalities.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Attempt to gain unauthorized access to, interfere with, damage,
                or disrupt any parts of the Website, the server on which the
                Website is stored, or any server, computer, or database
                connected to the Website, including any underlying blockchain.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Violate the legal rights (including the rights of publicity and
                privacy) of others or contain any material that could give rise
                to any civil or criminal liability under applicable laws or
                regulations or that otherwise may be in conflict with these
                Terms of Use.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Attack the Website, the Services, the Protocol, any of the
                Services&rsquo; underlying blockchain networks or technologies,
                or any other functionality with which the Services interact via
                a denial-of-service attack or a distributed denial-of-service
                attack.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Encourage or induce any third party to engage in any of the
                activities prohibited under these Terms.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Otherwise interfere with or attempt to interfere with the proper
                working of the Website or the Services in any way.
              </span>
            </li>
          </ul>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              The User further agrees to not upload abusive content, files or
              images to the Website. Intuition reserves the right to remove any
              content, file or image deemed abusive at its sole discretion and
              assumes no liability for loss incurred through uploading or
              otherwise interacting with abusive content. Abusive content may
              include, but is not limited to:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_oucgwelwomu1-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">Copyrighted material.</span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">Gore.</span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Hate speech (e.g., demeaning race, gender, age, religious or
                sexual orientation, etc.), or material that is otherwise
                threatening, harassing, defamatory, or that encourages violence
                or crime.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Pornography, including illegal content such as child sexual
                abuse material or nonconsensual pornography.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Any file that is otherwise illegal or infringes on the privacy
                rights of any person or entity.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Files intended to harass, spam, or promote anything for
                commercial profit.
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              <br />
              5. &nbsp;Monitoring and Enforcement; Termination
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              We have the right to:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_lr2946qi1hef-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Take appropriate legal action, including without limitation,
                referral to law enforcement, for any illegal or unauthorized use
                of the Website.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Terminate or suspend your access to all or part of the Website
                for any or no reason, including without limitation, any
                violation of these Terms of Use.
                <br />
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              Without limiting the foregoing, Intuition contributors have the
              right to cooperate fully with any law enforcement authorities or
              court order requesting or directing us to disclose the identity or
              other information of anyone posting any materials on or through
              the Website. BY USING THE SERVICES, YOU WAIVE AND HOLD HARMLESS
              INTUITION AND ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS
              FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE
              FOREGOING PARTIES DURING, OR TAKEN AS A CONSEQUENCE OF,
              INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT
              AUTHORITIES.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              However, we cannot review interactions or activities before they
              are executed through the Website, and, given the nature of
              blockchain and functionalities like those offered via the
              Services, cannot ensure prompt removal or rectification of
              objectionable interactions or activities after they have been
              executed. Accordingly, the User agrees that we assume no liability
              for any action or inaction regarding transmissions,
              communications, transactions, blockchain operations, or content
              provided by any Participant or third party, including any that may
              cause a malfunction or inaccuracy on the Website or among the
              Services. We have no liability or responsibility to anyone for any
              other party&rsquo;s performance or nonperformance of the
              activities described in this Section, nor for any harms or damages
              created by others&rsquo; interactions with any blockchain
              underlying the Services or reliance on the information or content
              presented on the Website.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              6. &nbsp;Notice for Claims of Intellectual Property Violations and
              Copyright Infringement
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              We respond to notices of alleged copyright infringement under the
              United States Digital Millennium Copyright Act. Our team works to
              ensure that content on our site or in our app does not infringe
              upon the copyright, trademark, or certain other intellectual
              property rights of third parties. If you believe that your
              intellectual property rights have been infringed, please notify
              contact@intuition.systems and we will investigate.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              7. &nbsp;Changes to These Terms of Use
              <br />
            </span>
          </p>
          <p className="c0">
            <span>
              We may revise and update these Terms of Use from time to time in
              our sole discretion. All changes are effective immediately when we
              post them and apply to all access to and use of the Website
              thereafter. However, any changes to the dispute resolution
              provisions set out in the Section entitled{' '}
            </span>
            <span className="c5">Governing Law &amp; Jurisdiction</span>
            <span className="c1">
              &nbsp;below will not apply to any disputes for which the parties
              have actual notice before the date the change is posted on the
              Website.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              The User&rsquo;s continued use of the Website or the Services
              following the posting of revised Terms of Use means that the User
              accepts and agrees to the changes. The User is expected to check
              this page each time it accesses this Website or the Interface, so
              it is aware of any changes as they are binding on the User.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              8. &nbsp;Intellectual Property Rights
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              Except any open-source software or other material incorporated the
              Website or the Services, the Website and its entire contents,
              features, and functionality (including but not limited to all
              information, software, text, displays, images, video, and audio,
              and the design, selection, and arrangement thereof) are owned by
              Intuition, its licensors, or other providers of such material and
              are protected by international copyright, trademark, patent, trade
              secret, and other intellectual property or proprietary rights
              laws. The User must not reproduce, distribute, modify, create
              derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our
              Website, except as follows:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_112atmtzryqw-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                The User&rsquo;s computer may temporarily store copies of such
                materials in RAM incidental to the User&rsquo;s accessing and
                viewing those materials.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                The User may store files that are automatically cached by the
                User&rsquo;s web browser for display enhancement purposes.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                The User may print or download one copy of a reasonable number
                of pages of the Website for its own personal, non-commercial use
                and not for further reproduction, publication, or distribution.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                If we provide desktop, mobile, or other applications for
                download, the User may download a single copy to its computer or
                mobile device, provided the User agrees to be bound by any
                applicable end user license agreement or other similar agreement
                for such applications.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                For any open-source materials provided on the Website or through
                the Services, the User may perform any activities only as is
                consistent with the open-source license applicable to such
                materials.
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              <br />
              The User must not:
              <br />
            </span>
          </p>
          <ul className="c3 lst-kix_psoc6t7ms2fi-0 start">
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Modify copies of any materials from this Website.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Use any illustrations, photographs, video or audio sequences, or
                any graphics separately from the accompanying text.
              </span>
            </li>
            <li className="c0 c4 li-bullet-0">
              <span className="c1">
                Delete or alter any copyright, trademark, or other proprietary
                rights notices from copies of materials from this Website.
                <br />
              </span>
            </li>
          </ul>
          <p className="c0">
            <span className="c1">
              If the User prints, copies, modifies, downloads, or otherwise uses
              or provides any other person with access to any part of the
              Website in breach of these Terms of Use, the User&rsquo;s right to
              access the Website will stop immediately and the User must, at our
              option, return or destroy any copies of the materials the User has
              made. No right, title, or interest in or to the Website or any
              content on the Website is transferred to the User, and all rights
              not expressly granted are reserved by Intuition.
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              Notwithstanding anything to the contrary in these Terms of Use,
              the User may freely use any open-sourced materials up to the
              limits provided, but in accordance with any requirements placed,
              by those materials&rsquo; open-source licenses.
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              Any use of the Website not expressly permitted by these Terms of
              Use is a breach of these Terms of Use and may violate copyright,
              trademark, and other laws.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              9. &nbsp;Trademarks
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              The Intuition name and all related names, logos, product and
              service names, designs, and slogans are trademarks of Intuition or
              its affiliates or licensors. You must not use such marks without
              the prior written permission of Intuition; provided, however, the
              User is hereby granted a limited, revocable, non-transferable
              permission and license to use the term &ldquo;Intuition&rdquo; and
              any related names, logos, product and service names, designs, and
              slogans in any way that they desire so long as such usage is not
              done in a way that: (1) is deceitful, fraudulent, or manipulative;
              (2) implies any relationship between User and Intuition beyond
              that reasonably typical of a website administrator and its users;
              or (3) to cause confusion in any way to gain crypto-assets of, or
              personal information about, another party other than that intended
              by the Services, the Protocol, the Interface or any related or
              interacting functionality (for example but without limitation, you
              may not use the foregoing marks to execute phishing attacks,
              spearphishing attacks, social engineering, or in any way that may
              cause a party to transmit crypto-assets to an unintended recipient
              or to reveal private information, like a private key or password).
              All other names, logos, product and service names, designs, and
              slogans on the Website and Website are the trademarks of their
              respective owners.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">10. &nbsp;Reliance on Information Posted</span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              The content and information presented on or through the Website
              (including, without limitation, on the Interface) is made
              available solely for general information and education purposes.
              We do not warrant the accuracy, completeness, or usefulness of
              this information. Any information posted to the Website or through
              the Services should not be construed as an intention to form a
              contract, and in no case should any information be construed as
              Intuition&rsquo;s offer to buy, sell, or exchange crypto-assets.
              Any reliance the User places on such information is strictly at
              the User&rsquo;s own risk, and as is common in the blockchain
              space, the User is assuming a high amount of risk related to
              others or technical harms when operating via the Website, the
              Interface, and the Services. We disclaim all liability and
              responsibility arising from any reliance placed on such materials
              by the User or any other Participant, by anyone who may be
              informed of any of the Website&rsquo;s or the Services&rsquo;
              contents, or by the actions or omissions of others interacting
              with the Protocol or any underlying blockchain.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              This Website or the Services may include content provided by third
              parties, including (without limitation) materials provided by
              bloggers, blockchain users, other decentralized applications,
              aggregators, and/or reporting services. All statements, alleged
              facts, and/or opinions expressed in these materials, and all
              articles and responses to questions and other content, other than
              the content provided through official Intuition channels, are
              solely the opinions and the responsibility of the person or entity
              providing those materials. These materials do not necessarily
              reflect the opinion of individual Intuition contributors or even
              the factual status of reality. We are not responsible, or liable
              to the User or any third party, for the content or accuracy of any
              materials provided by any third parties, and User agrees that it
              bears sole and absolute responsibility to evaluate and select any
              third-party functionality with which it interacts via the
              Services.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              11. &nbsp;Changes to the Website
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              We may update the content on, design of, or functionalities
              available through this Website or through the Services from time
              to time, but the Website and the Services are not necessarily
              complete or up-to-date. Any of the material on the Website or
              provided through the Services may be out of date at any given
              time, and we are under no obligation to update such material.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              12. &nbsp;WARRANTY DISCLAIMER
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              The User is responsible for its use of the Services, the
              functionalities they enable, transactions engaged through the
              Website or the Interface, and the use of the information derived
              thereof. The User is solely responsible for complying with all
              Applicable Laws related to its transactions and activities that
              directly or indirectly incorporate our provision of the Services,
              including, but not limited to, the Commodity Exchange Act and its
              regulations as overseen by the U.S. Commodity Futures Trading
              Commission (&ldquo;CFTC&rdquo;), and the federal securities laws
              and its regulations overseen by the U.S. Securities and Exchange
              Commission (&ldquo;SEC&rdquo;). The User acknowledges its
              understanding that Intuition is not registered nor licensed with,
              nor have our Website, Interface, or Services (or the software
              contained therein) been reviewed or evaluated by, the CFTC, SEC,
              or any other financial or banking regulator of any jurisdiction.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              The User understands that we cannot and do not guarantee or
              warrant that files available for download from the internet or the
              Website or through the Services will be free of viruses or other
              destructive code. The User is responsible for implementing
              sufficient procedures and checkpoints to satisfy the User&rsquo;s
              particular requirements for: (1) an appropriate Web3 Utility; (2)
              anti-virus protection and accuracy of data input and output; (3)
              its participation in and use of DeFi products, the protocol, and
              any of the Services&rsquo; underlying blockchain and related
              technologies; and (4) maintaining a means external to our site to
              reconstruct of any lost data.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR
              ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE
              ATTACK, MAN-IN-THE-MIDDLE ATTACK, VIRUSES, OR OTHER
              TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT THE USER&rsquo;S
              COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY
              MATERIAL DUE TO THE USER&rsquo;S USE OF THE WEBSITE OR ANY
              SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO THE
              USER&rsquo;S DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY
              WEBSITE LINKED TO IT.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              THE USER&rsquo;S USE OF THE WEBSITE AND THE INTERFACE, THE
              PROTOCOL, AND ANY OF THE SERVICES (AND ANY OF THEIR CONTENT) IS AT
              THE USER&rsquo;S SOLE RISK. THE WEBSITE, THE INTERFACE, AND THE
              SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rsquo;&rsquo; AND
              &ldquo;AS AVAILABLE&rdquo; BASIS. TO THE FULLEST EXTENT LEGALLY
              PERMISSIBLE, NEITHER WE, NOR ANY PERSON ASSOCIATED WITH INTUITION,
              MAKE, AND WE EXPLICITLY DISCLAIM, ANY AND ALL REPRESENTATIONS OR
              WARRANTIES OF ANY KIND RELATED TO THE WEBSITE, THE INTERFACE, AND
              THE SERVICES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING
              (WITHOUT LIMITATION) THE WARRANTIES OF MERCHANTABILITY,
              NON-INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE. NEITHER
              INTUITION NOR ANY PERSON ASSOCIATED WITH INTUITION MAKES ANY
              WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
              SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
              WEBSITE, THE INTERFACE, OR THE SERVICES. INTUITION AND ANY PERSON
              ASSOCIATED WITH INTUITION DO NOT REPRESENT OR WARRANT THAT: (1)
              ACCESS TO THE WEBSITE, THE INTERFACE, OR THE SERVICES WILL BE
              CONTINUOUS, UNINTERRUPTED, TIMELY, WITHOUT DELAY, ERROR-FREE,
              SECURE, OR FREE FROM DEFECTS; (2) THAT THE INFORMATION CONTAINED
              OR PRESENTED ON THE WEBSITE OR VIA THE SERVICES IS ACCURATE,
              RELIABLE, COMPLETE, CONCISE, CURRENT, OR RELEVANT; (3) THAT THE
              WEBSITE, THE INTERFACE, THE SERVICES, OR ANY SOFTWARE CONTAINED
              THEREIN WILL BE FREE FROM DEFECTS, MALICIOUS SOFTWARE, ERRORS, OR
              ANY OTHER HARMFUL ELEMENTS, OR THAT ANY OF SUCH WILL BE CORRECTED;
              OR (4) THAT THE WEBSITE, THE INTERFACE, OR THE SERVICES WILL MEET
              THE USER&rsquo;S EXPECTATIONS. NO INFORMATION OR STATEMENT THAT WE
              MAKE, INCLUDING DOCUMENTATION OR OUR PRIVATE COMMUNICATIONS,
              SHOULD BE TREATED AS OFFERING ANY WARRANTY CONCERNING THE WEBSITE,
              THE INTERFACE, OR THE SERVICES. WE DO NOT ENDORSE, GUARANTEE, OR
              ASSUME ANY LIABILITY OR RESPONSIBILITY FOR ANY CONTENT,
              ADVERTISEMENTS, OFFERS, STATEMENTS, OR ACTIONS BY ANY THIRD PARTY
              EITHER REGARDING THE WEBSITE OR THE SERVICES.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              13. &nbsp;LIMITATION OF LIABILITY
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL INTUITION,
              ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
              CONTRIBUTORS, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES
              OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
              CONNECTION WITH THE USER&rsquo;S USE, OR INABILITY TO USE, THE
              WEBSITE, THE INTERFACE, THE SERVICES, THE PROTOCOL, ANY WEBSITES
              LINKED THROUGH OUR SERVICES, ANY CONTENT ON THE WEBSITE OR SUCH
              OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
              INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
              LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL
              DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR
              ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA,
              AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF
              CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. THIS DISCLAIMER OF
              LIABILITY EXTENDS TO ANY AND ALL DAMAGES CAUSED BY ANY THIRD PARTY
              (INCLUDING, WITHOUT LIMITATION, THOSE CAUSED BY FRAUD, DECEIT, OR
              MANIPULATION), WHETHER OR NOT A PARTICIPANT, OR ANY FAILURE,
              EXPLOIT, OR VULNERABILITY OF THE WEBSITE, SERVICES, THE PROTOCOL,
              THE USER&rsquo;S WEB3 UTILITIES, OR THE UNDERLYING BLOCKCHAINS OR
              RELATED BLOCKCHAIN FUNCTIONALITIES. TO THE FULLEST EXTENT PROVIDED
              BY LAW, IN NO EVENT WILL THE COLLECTIVE LIABILITY OF INTUITION AND
              ITS SUBSIDIARIES AND AFFILIATES, AND THEIR LICENSORS, SERVICE
              PROVIDERS, CONTRIBUTORS, AGENTS, OFFICERS, AND DIRECTORS, TO ANY
              PARTY (REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT,
              TORT, OR OTHERWISE) EXCEED THE GREATER OF $100 OR THE AMOUNT YOU
              HAVE PAID DIRECTLY TO INTUITION FOR THE APPLICABLE CONTENT OR
              SERVICES IN THE LAST SIX MONTHS OUT OF WHICH LIABILITY AROSE.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              14. &nbsp;Nature of Blockchain; Beta status; Assumption of Risk;
              Waiver of Claims
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              Blockchains, DEXs, DeFi, crypto-assets, the Protocol, and their
              related technologies and functionalities are still emerging
              innovations that carry a relatively high amount of foreseeable and
              unforeseeable risk from security, financial, technical, political,
              social, and personal safety standpoints. Further, the Intuition is
              still in beta and Users acknowledge the elevated risk associated
              with early testing of the Website, the Interface, the Services,
              and the Protocol.
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              The mere access to and interaction with blockchains requires high
              degrees of skill and knowledge to operate with a relative degree
              of safety and proficiency. Crypto-assets are highly volatile in
              nature due to many diverse factors, including without limitation
              use and adoption, speculation, manipulation, technology, security,
              and legal and regulatory developments and application. Further,
              the speed and cost of transacting with cryptographic technologies,
              such as blockchains like those underlying the Protocol, are
              variable and highly volatile. Moreover, the transparent nature of
              many blockchains means that any interactions the User has with the
              Protocol and any blockchain may be publicly visible and readable
              in human form.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              By accessing and using the Website or the Services, the User
              acknowledges the foregoing, and agrees and represents that it
              understands and assumes such and other risks involved with
              blockchains, DeFi, the Protocol, and related technologies
              (including without limitation any specific technical language used
              in this Agreement). The User further represents that it has all
              knowledge sufficient to work, and is informed of all foreseeable
              risks and the possibility of unforeseeable risks, associated with
              blockchains, crypto-assets, Web3 Utilities, smart contracts, the
              Interface, the Protocol, and the Services. The User further
              acknowledges, and assumes all risk related to the possibility,
              that any information presented via the Website, Interface, or
              Services may be inaccurate, possibly due to another party&rsquo;s
              malicious activities and possibly to the User&rsquo;s severe harm
              or detriment. The User agrees that we are not responsible for any
              of these or related risks, do not own or control any blockchain
              and cannot guarantee the safe or accurate functioning of the
              Services, and shall not be held liable for any resulting harms,
              damages, or losses incurred by or against the User experiences
              while accessing or using the Website or the Services. Accordingly,
              the User acknowledges the foregoing, represents its understanding
              of the foregoing, and agrees to assume full responsibility for all
              of the risks of accessing and using the Website and interacting
              with the Services, whether mentioned in this Section or otherwise.
              The User further expressly waives and releases us from any and all
              liability, claims, causes of action, or damages arising from or in
              any way relating to the User&rsquo;s use of the Website and the
              User&rsquo;s interaction with the Services.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              15. &nbsp;No Professional Advice
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              All information or content provided or displayed by the Website
              (including, without limitation, on the Interface) is for
              informational purposes only and should not be construed as
              professional advice (including, without limitation, tax, legal, or
              financial advice). The User should not take or refrain from taking
              any action based on any information or content displayed or
              provided on the Website, on the Interface, or through the
              Services. The User should seek independent professional advice
              from an individual licensed and competent in the appropriate area
              before the User makes any financial, legal, or other decisions
              where such should be considered prudent. The User acknowledges and
              agrees that, to the fullest extent permissible by law, it has not
              relied on Intuition, the content on the Website, the Interface, or
              the Services for any professional advice related to its financial
              or legal behaviors.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              16. &nbsp;No Fiduciary Duties
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              These Terms of Use, and the provision of the Website and the
              Services, are not intended to create any fiduciary duties between
              us and the User or any third party. Intuition contributors never
              take possession, custody, control, ownership, or management of any
              crypto-assets or other property transmitted via the Interface. To
              the fullest extent permissible by law, the User agrees that
              neither the User&rsquo;s use of the Website or the Services causes
              us or any Participant to owe fiduciary duties or liabilities to
              the User or any third party. Further, the User acknowledges and
              agrees to the fullest extent such duties or liabilities are
              afforded by law or by equity, those duties and liabilities are
              hereby irrevocably disclaimed, waived, and eliminated, and that we
              and any other Participant shall be held completely harmless in
              relation thereof. The User further agrees that the only duties and
              obligations that we or any Contributor owes the User, and the only
              rights the User has related to this Agreement or the User&rsquo;s
              use of the Website or the Services, are those set out expressly in
              this Agreement or that cannot be waived by law. Further, the User
              agrees and understands that they are responsible for all
              applicable reporting requirements and deadlines, including taxes
              and relevant fees, and that we owe Users no affirmative duties
              with respect to said reporting requirements and deadlines.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              17. &nbsp;No Insurance
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              Your crypto accounts are not checking or savings accounts. We do
              not provide any kind of insurance to you against any type of loss,
              including (without limitation) losses due to decrease in value of
              assets, assets lost due to a cybersecurity failure, or from your
              or other individuals&rsquo; errors or malfeasance. In most
              jurisdictions crypto-assets are not considered legal tender, and
              most crypto-assets are not backed by any government. Neither your
              crypto-asset balances nor any of your transactions via the
              Interface or Protocol are covered by Federal Deposit Insurance
              Corporation (FDIC), Securities Investor Protection Corporation
              (SIPC), or other similar protections.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              18. &nbsp;Indemnification
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              The User agrees to defend, indemnify, and hold harmless Intuition,
              its affiliates, licensors, and service providers, and its and
              their respective officers, directors, contributors, contractors,
              agents, licensors, suppliers, successors, and assigns from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees (including reasonable
              attorneys&rsquo; fees) arising out of or relating to: (1) the
              User&rsquo;s violation of these Terms of Use; (2) the User&rsquo;s
              use of the Website, the Services, or the Protocol, including, but
              not limited to, the User&rsquo;s interactions with the Interface
              or other features which incorporate the Services, use of or
              reliance on the Website&rsquo;s content, services, and products
              other than as expressly authorized in these Terms of Use; (3) the
              User&rsquo;s use or reliance on of any information obtained from
              the Website; or (4) any other party&rsquo;s access and use of the
              Website or Services with the User&rsquo;s assistance or by using
              any device or account that the User owns or controls.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              19. &nbsp;Governing Law and Jurisdiction
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              The User agrees to defend, indemnify, and hold harmless Intuition,
              its affiliates, licensors, and service providers, and its and
              their respective officers, directors, contributors, contractors,
              agents, licensors, suppliers, successors, and assigns from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees (including reasonable
              attorneys&rsquo; fees) arising out of or relating to: (1) the
              User&rsquo;s violation of these Terms of Use; (2) the User&rsquo;s
              use of the Website, the Services, or the Protocol, including, but
              not limited to, the User&rsquo;s interactions with the Interface
              or other features which incorporate the Services, use of or
              reliance on the Website&rsquo;s content, services, and products
              other than as expressly authorized in these Terms of Use; (3) the
              User&rsquo;s use or reliance on of any information obtained from
              the Website; or (4) any other party&rsquo;s access and use of the
              Website or Services with the User&rsquo;s assistance or by using
              any device or account that the User owns or controls.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              20. &nbsp;Arbitration; Class Arbitration Waiver
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              Any dispute, controversy or claim arising out of, relating to, or
              in connection with the User&rsquo;s use of the Website or the
              Services, or in connection with this Agreement, including disputes
              arising from or concerning their interpretation, violation,
              invalidity, non-performance, or termination, shall be finally
              resolved by binding individual arbitration before a single
              arbitrator appointed by the American Arbitration Association
              (&ldquo;AAA&rdquo;) under the Federal Arbitration Act (&ldquo;FAA)
              and not sue in court in front of a judge or jury. TThe neutral
              arbitrator will decide the dispute, and the arbitrator&rsquo;s
              decision will be final except for a limited right of review under
              the FAA. The parties agree to arbitrate solely on an individual
              basis, and that these Terms of Use do not permit className
              arbitration or any claims brought as a plaintiff or className
              member in any className or representative arbitration proceeding.
              The arbitrator may not consolidate more than one person&rsquo;s
              claims and may not otherwise preside over any form of a
              representative or className proceeding. In the event the
              prohibition on className arbitration is deemed invalid or
              unenforceable, then its remaining portions will remain in force.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0">
            <span className="c1">
              21. &nbsp;Limitation on Time to File Claims
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              ANY CAUSE OF ACTION OR CLAIM THE USER MAY HAVE ARISING OUT OF OR
              RELATING TO THESE TERMS OF USE OR ITS USE OF THE WEBSITE MUST BE
              COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES;
              OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              22. &nbsp;Waiver and Severability
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              No waiver by Intuition of any term or condition set out in these
              Terms of Use shall be deemed a further or continuing waiver of
              such term or condition or a waiver of any other term or condition,
              and any failure of Intuition to assert a right or provision under
              these Terms of Use shall not constitute a waiver of such right or
              provision.
              <br />
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              If any provision of these Terms of Use is held by a court or other
              tribunal of competent jurisdiction to be invalid, illegal, or
              unenforceable for any reason, such provision shall be eliminated
              or limited to the minimum extent such that the remaining
              provisions of these Terms of Use will continue in full force and
              effect.
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              23. &nbsp;Entire Agreement
            </span>
          </p>
          <p className="c0">
            <span className="c1">
              <br />
              These Terms of Use, the Privacy Policy, and any other document
              incorporated by reference herein constitute the sole and entire
              agreement between the User and Intuition regarding the Website and
              supersede all prior and contemporaneous understandings,
              agreements, representations, and warranties, both written and
              oral, regarding the Website.
            </span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
          <p className="c0 c2">
            <span className="c1"></span>
          </p>
        </div>
      </div>
    </div>
  )
}
