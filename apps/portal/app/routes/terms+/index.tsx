import './style.css'

import { Icon, IconName, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export default function TermsRoute() {
  return (
    <div className="flex flex-col justify-between h-screen w-full p-8">
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
            <Icon name={IconName.folder} className="h-6 w-6" />
            Terms and Conditions
          </Text>
        </div>
        <div className="px-6">
          <p className="c13">
            <span className="c0">TERMS OF SERVICE</span>
          </p>
          <p className="c10">
            <span className="c0"></span>
          </p>
          <p className="c14">
            <span className="c6 c21">Last Revised on August 8, 2024</span>
          </p>
          <p className="c13">
            <span>The Terms of Service (these &ldquo;</span>
            <span className="c6">Terms</span>
            <span>&rdquo; or the &ldquo;</span>
            <span className="c6">Agreement</span>
            <span>
              &rdquo;) for the website portal.intuition.systems (the &ldquo;
            </span>
            <span className="c6">Portal</span>
            <span>,&rdquo; &ldquo;</span>
            <span className="c6">Website</span>
            <span>,&rdquo; or &ldquo;</span>
            <span className="c6">Interface</span>
            <span>
              &rdquo;) apply to the Website and any content, smart contracts,
              tools, features and functionality offered on or through the
              Website (collectively the &ldquo;
            </span>
            <span className="c6">Services</span>
            <span>
              &rdquo;) and are entered into are entered into by and between you
              as the user of the Services (&ldquo;
            </span>
            <span className="c6">you</span>
            <span>,&rdquo; &ldquo;</span>
            <span className="c6">your</span>
            <span>,</span>
            <span className="c6">&rdquo;</span>
            <span>&nbsp;or the &ldquo;</span>
            <span className="c6">User</span>
            <span>
              &rdquo;) and the Website&rsquo;s operators Intuition Systems, Inc.
              (&ldquo;
            </span>
            <span className="c6">we</span>
            <span>,&rdquo; </span>
            <span className="c6">our</span>
            <span>,&rdquo; &ldquo;</span>
            <span className="c6">us</span>
            <span>,&rdquo; &ldquo;</span>
            <span className="c6">Intuition</span>
            <span>,&rdquo; &ldquo;</span>
            <span className="c6">Company</span>
            <span className="c1">&rdquo;). </span>
          </p>
          <p className="c10">
            <span className="c1"></span>
          </p>
          <p className="c14">
            <span className="c1">
              These Terms govern your access to and use of the Services, which
              use a suite of experimental blockchain-oriented functionalities.
              Using these functionalities (including via the interface on our
              website) poses significant risks to you and your online assets.
              Please read these terms carefully, as they contain very important
              information regarding these risks and your rights and obligations,
              as well as conditions, limitations, and exclusions that might
              apply to you and your rights. By accessing and/or using the
              Services, you are agreeing to these Terms. If you do not
              understand or agree to these Terms, please do not use the
              Services.
            </span>
          </p>
          <p className="c13">
            <span className="c1">
              If you use the Services on behalf of a company or other entity
              then &ldquo;you&rdquo; includes you and that entity, and you
              represent and warrant that (a) you are an authorized
              representative of the entity with the authority to bind the entity
              to these Terms, and (b) you agree to these Terms on the
              entity&rsquo;s behalf.
            </span>
          </p>
          <p className="c10">
            <span className="c1"></span>
          </p>
          <p className="c16">
            <span className="c6">
              SECTION 9 CONTAINS AN ARBITRATION CLAUSE AND CLASS ACTION WAIVER.
              BY AGREEING TO THESE TERMS, YOU AGREE (A) TO RESOLVE ALL DISPUTES
              WITH US (WITH LIMITED EXCEPTION) RELATED TO THE COMPANY&rsquo;S
              SERVICES AND/OR PRODUCTS THROUGH BINDING INDIVIDUAL ARBITRATION,
              WHICH MEANS THAT YOU WAIVE ANY RIGHT TO HAVE THOSE DISPUTES
              DECIDED BY A JUDGE OR JURY, AND (B) TO WAIVE YOUR RIGHT TO
              PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR
              REPRESENTATIVE ACTIONS, AS SET FORTH BELOW. YOU HAVE THE RIGHT TO
              OPT-OUT OF ARBITRATION CLAUSE AND THE CLASS ACTION WAIVER AS
              EXPLAINED IN SECTION 9.
            </span>
          </p>
          <p className="c10">
            <span className="c1"></span>
          </p>
          <p className="c18" id="h.30j0zll">
            <span className="c0">TABLE OF CONTENTS</span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.ncf24gfua7ei">
                1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;THE
                SERVICES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.kg6jgqtuw849">
                2. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ELIGIBILITY;
                USER ACCOUNTS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.dgq21f1fnx6w">
                3. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOCATION OF
                OUR PRIVACY AND ADDITIONAL
                POLICIES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.71tzq3vgeem3">
                4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RIGHTS WE
                GRANT YOU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.gka81dyq0vrg">
                5. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;USE OF THE
                SERVICES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.s32s21zoksm">
                6. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OWNERSHIP AND
                CONTENT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.m4uij41phr5g">
                7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WEBSITE
                CONTENT AND
                INFORMATION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.75sckzu9p7lo">
                8. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DISCLAIMERS,
                LIMITATIONS OF LIABILITY, AND
                INDEMNIFICATION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.ir4t1q6ixcix">
                9. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ARBITRATION
                AND CLASS ACTION
                WAIVER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13
              </a>
            </span>
          </p>
          <p className="c11">
            <span className="c0">
              <a className="c3" href="#h.8hgf2omby0vc">
                10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ADDITIONAL
                PROVISIONS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15
              </a>
            </span>
            <span className="c6">
              <br />
            </span>
          </p>
          <ol className="c2 lst-kix_v61pi1glm5bt-0 start" start={1}>
            <li className="c17 li-bullet-0">
              <h1 id="h.ncf24gfua7ei" className="inline">
                <span>THE SERVICES</span>
                <span className="c0">
                  <br />
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Attestation Data Market and the Protocol
              </span>
              <span>. </span>
              <span>
                The Website&rsquo;s Services include without limitation
                providing methods and information to enable those who access the
                Portal (&ldquo;
              </span>
              <span className="c6">Participants</span>
              <span className="c1">
                &rdquo;) to access to or participate in attestation and data
                market mechanisms powered by blockchain-enforced smart contracts
                (the &ldquo;Protocol&rdquo;). The Protocol is intended to be
                provided and operate in a decentralized manner, meaning that
                Intuition has no ability to control, modify, prevent, stop,
                amend, or adjust interactions or transactions after they are
                submitted to the Protocol, whether or not through the Interface.
                Further, the Interface is not the only method that individuals
                or parties may interact with, contribute to, access, or
                otherwise affect the Protocol. Thus, the Services (including the
                Website and the Interface) are distinct from the Protocol, and
                any of the Protocol&rsquo;s products or offerings should not be
                viewed as products or offerings provided by the Website. You are
                expected to be familiar with the Protocol and the risks it
                represents (including without limitation the possibility of your
                crypto-assets being forfeited according to the Protocol&rsquo;s
                rules or being lost for any &nbsp;other reason) before accessing
                it (whether accessed via the Interface or otherwise). YOU
                ACKNOWLEDGE AND AGREE THAT YOUR USE OR INTERACTION WITH THE
                PROTOCOL IS AT YOUR OWN RISK AND INTUITION WAIVES ALL LIABILITY
                OR RESPONSIBILITY, AND MAKES NO WARRANTIES, RELATED TO THE
                PROTOCOL, WHETHER OR NOT THE PROTOCOL IS ACCESSED VIA OUR
                SERVICES.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Blockchain Fees</span>
              <span>.</span>
              <span className="c6">&nbsp;</span>
              <span>
                Your full use and enjoyment of the Services (whether or not by
                using the Interface) may require you to pay transactional fees
                required by their underlying blockchain or distributed ledger
                service, or by the Protocol itself, that are designed to
                encourage their intended use among the Protocol&rsquo;s
                participants (&ldquo;Blockchain Fees&rdquo;). You acknowledge
                that in no event will Intuition be responsible to you or any
                other party for the payment, repayment, refund, disbursement,
                indemnity, or for any other aspect of your use or transmission
                of Blockchain Fees
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <h2 id="h.7u18h5ck514k" className="inline">
                <span className="c7 c8">Wallets</span>
                <span className="c8">
                  . All transactions initiated through our Services require you
                  to use third party digital wallets (&ldquo;
                </span>
                <span className="c8 c6">Wallets</span>
                <span className="c8">
                  &rdquo;). Your use of any Wallet is solely at your own risk.
                  &nbsp;You agree that you authorize all transactions initiated
                  by you or on your behalf through the Services in connection
                  with your Wallet. We have no control over any blockchain and
                  cannot and do not guarantee that any transaction details that
                  you submit or receive via the Services will be validated by or
                  confirmed on such blockchain. By using such Wallets to conduct
                  transactions via the Services, you agree that you are governed
                  by the terms of service and privacy policy for the applicable
                  Wallets, and that the Company has no responsibility, liability
                  or responsibility to you in any way arising from your use of
                  such Wallets, including for any security failures or other
                  errors or failures of such Wallets.{' '}
                </span>
                <span className="c0">
                  The private keys necessary to access the assets held in a
                  Wallet are not held by the Company. The Company has no ability
                  to help you access or recover your private keys and/or seed
                  phrases for your Wallet. You are solely responsible for
                  maintaining the confidentiality of your private keys and you
                  are responsible for any transactions signed with your private
                  keys.
                </span>
              </h2>
            </li>
            <li className="c4 li-bullet-0">
              <h2 id="h.ryos5de0xjl3" className="inline">
                <span className="c7 c8">Third Party Platforms</span>
                <span className="c8">
                  . You may be able to transact and otherwise interact with the
                  Protocol&rsquo;s attestation and data market mechanisms via
                  third party platforms (&ldquo;
                </span>
                <span className="c8 c6">Third Party Platforms</span>
                <span className="c1">
                  &rdquo;). &nbsp;We are not party to any agreements between
                  Users and any Third Party Platforms. If you have a dispute
                  with one or more users in connection with transactions
                  performed via Third Party Platforms, you release us (and our
                  affiliates and subsidiaries, and our and their respective
                  officers, directors, employees and agents) from claims,
                  demands and damages (actual and consequential) of every kind
                  and nature, known and unknown, arising out of or in any way
                  connected with such disputes. In entering into this release
                  you expressly waive any protections (whether statutory or
                  otherwise) that would otherwise limit the coverage of this
                  release to include only those claims which you may know or
                  suspect to exist in your favor at the time of agreeing to this
                  release. &nbsp;We may not be able to control the actions of
                  Third Party Platforms, and we make no promises or guarantees
                  of any kind regarding Third Party Platforms.
                </span>
              </h2>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Points</span>
              <span className="c1">
                . The Services may allow you to receive points
                (&ldquo;Points&rdquo;) for performing certain actions and
                participating in the Services. These points are not facilitated
                by blockchain technology and are assigned and maintained
                off-chain by the Company at its sole discretion. By
                participating in the Services and receiving points, you
                acknowledge and agree that you are receiving points solely for
                the functionality, traits and features that exist as of the date
                the points are received, and not in anticipation of any future
                or speculative functionality, traits, features or economic
                benefit that may be associated with such points.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Connected Services</span>
              <span>
                . You may be able to display and showcase Points or attestation
                data created using the Websites Services within third-party
                applications and services that have integrated with the Services
                to allow relevant data to be displayed on their applications and
                services (&ldquo;
              </span>
              <span className="c6">Connected Services</span>
              <span>
                &rdquo;). &nbsp;To be clear, the Connected Services are owned
                and operated by third parties and are not owned or controlled by
                us. Thus, we can&rsquo;t make any guarantee or promise about the
                functionality or nature of any Connected Services, including
                whether you&rsquo;ll be able to display and use relevant data
                within any Connected Services.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <h2 id="h.i4ql26stjm37" className="inline">
                <span className="c7 c8">Additional Information</span>
                <span className="c1">
                  . In order to transact through our Services, we or our
                  services providers may require you to provide additional
                  information and documents regarding your use of the Services,
                  including at the request of any competent authority or in case
                  of application of any applicable law or regulation, including
                  laws related to anti-money laundering, or for counteracting
                  financing of terrorism. If you do not provide complete and
                  accurate information and documentation in response to such a
                  request, your transactions may not be processed through our
                  Services. You acknowledge that there may also be a time delay
                  between the time when you submit such information and when we
                  and/or our service providers are able to complete any
                  anti-money laundering, know-your-client or similar checks.
                </span>
              </h2>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Beta Offerings</span>
              <span>
                . From time to time, we may, in our sole discretion, include
                certain test or beta features or products in the Services
                (&ldquo;
              </span>
              <span className="c6">Beta Offerings</span>
              <span className="c1">
                &rdquo;) as we may designate from time to time. Your use of any
                Beta Offering is completely voluntary. The Beta Offerings are
                provided on an &ldquo;as is&rdquo; basis and may contain errors,
                defects, bugs, or inaccuracies that could cause failures,
                corruption or loss of data and information from any connected
                device. You acknowledge and agree that all use of any Beta
                Offering is at your sole risk. You agree that once you use a
                Beta Offering, your content or data may be affected such that
                you may be unable to revert back to a prior non-beta version of
                the same or similar feature. Additionally, if such reversion is
                possible, you may not be able to return or restore data created
                within the Beta Offering back to the prior non-beta version. If
                we provide you with any Beta Offerings on a closed beta or
                confidential basis, we will notify you of such as part of your
                use of the Beta Offerings. For any such confidential Beta
                Offerings, you agree to not disclose, divulge, display, or
                otherwise make available any of the Beta Offerings without our
                prior written consent.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={2}>
            <li className="c9 li-bullet-0">
              <h1 id="h.kg6jgqtuw849" className="inline">
                <span className="c0">
                  ELIGIBILITY; USER ACCOUNTS
                  <br />
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Eligibility</span>
              <span>
                . &nbsp;To use the Services, you must be 18 years of age or
                older and not be a Prohibited Person.
              </span>
              <span className="c6">&nbsp;</span>
              <span>A &ldquo;</span>
              <span className="c6">Prohibited Person</span>
              <span>
                &rdquo; is any person or entity that is (a) listed on any U.S.
                Government list of prohibited or restricted parties, including
                the U.S. Treasury Department&rsquo;s list of Specially
                Designated Nationals and Blocked Persons maintained by the US
                Treasury Department&rsquo;s Office of Foreign Assets Control
                (&ldquo;
              </span>
              <span className="c6">OFAC</span>
              <span>&rdquo;</span>
              <span>) or the U.S. Department of Commerce Denied </span>
              <span>Person&rsquo;s</span>
              <span>
                &nbsp;List or Entity List, (b) located or organized in any U.S.
                embargoed countries or any country that has been designated by
                the U.S. Government as a &ldquo;terrorist supporting&rdquo;, (c)
                on any list pursuant to European Union (&ldquo;
              </span>
              <span className="c6">EU</span>
              <span>&rdquo;) and/or United Kingdom (&ldquo;</span>
              <span className="c6">UK</span>
              <span>
                &rdquo;) regulations (as the latter are extended to the British
                Virgin Islands by statutory instrument); (ii) operationally
                based or domiciled in a country or territory in relation to
                which sanctions imposed by the United Nations (whether through
                the Security Council or otherwise), OFAC, the EU and/or the UK
                apply; or (iii) otherwise pursuant to sanctions imposed by the
                United Nations, OFAC, the EU or the UK; (c) for a senior foreign
                political figure, any member of a senior foreign political
                figure&rsquo;s immediate family or any close associate of a
                senior foreign political figure unless the directors of the
                Company, after being specifically notified by the Purchaser in
                writing that it is such a person, conduct further due diligence
                and determine that you shall be permitted to receive the
                relevant Company NFT under these terms, (d) trustee, agent,
                representative or nominee for a foreign shell bank, or (e) owned
                or controlled by such persons or entities listed in (a)-(e).
                &nbsp;You acknowledge and agree that you are solely responsible
                for complying with all applicable laws of the jurisdiction you
                are located or accessing the Services from in connection with
                your use of the Services. Further, if you use the Services, you
                may not transfer or provide to us any currency, digital assets
                or other items that have been derived from any illegal or
                unlawful activity.{' '}
              </span>
              <span className="c6">
                By using the Services, you represent and warrant that you meet
                these all requirements.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={3}>
            <li className="c9 li-bullet-0">
              <h1 id="h.dgq21f1fnx6w" className="inline">
                <span className="c0">
                  LOCATION OF OUR PRIVACY AND ADDITIONAL POLICIES
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Privacy Policy</span>
              <span className="c1">
                . Our Privacy Policy describes how we handle the information you
                provide to us when you use the Services. For an explanation of
                our privacy practices, please visit our Privacy Policy located
                at portal.intuition.systems/privacy.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={4}>
            <li className="c9 li-bullet-0">
              <h1 id="h.71tzq3vgeem3" className="inline">
                <span className="c0">RIGHTS WE GRANT YOU</span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <h2 id="h.svm0n0gedqmt" className="inline">
                <span className="c7 c8">Services License</span>
                <span className="c1">
                  . Subject to your compliance with these Terms, the Company
                  hereby grants to you, a personal, worldwide, royalty-free,
                  non-assignable, non-sublicensable, non-transferrable, and
                  non-exclusive license to use the software provided to you as
                  part of the Services. This license has the sole purpose of
                  enabling you to use and enjoy the benefit of the Services as
                  provided by us, in the manner permitted by these Terms and
                  subject to the use restrictions described below. Your access
                  and use of the Services may be interrupted from time to time
                  for any of several reasons, including, without limitation, the
                  malfunction of equipment, periodic updating, maintenance, or
                  repair of the Service or other actions that Company, in its
                  sole discretion, may elect to take.
                </span>
              </h2>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={5}>
            <li className="c17 li-bullet-0">
              <h1 id="h.gka81dyq0vrg" className="inline">
                <span className="c0">
                  USE OF THE SERVICES
                  <br />
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Accessing the Website and User Security
              </span>
              <span>
                . We reserve the right to withdraw or amend the Website
                (including the Interface), and any other Services or material we
                provide on the Website, in our sole discretion without notice.
                We will not be liable if for any reason all or any part of the
                Website, the Interface, the Protocol, or any of the Services are
                unavailable at any time or for any period. From time to time, we
                may restrict access to some parts of the Website, or the entire
                Website, to Participants. <br />
                <br />
                To access certain Services or some of the resources offered on
                the Website, the User may be asked to provide certain
                registration details or other information. Other Services or
                resources offered on the Website (such as the Interface) may
                require the User to utilize certain Web3 capabilities, such a
                crypto-asset wallet capable of interacting with the User&rsquo;s
                web browser or relevant blockchain nodes (&ldquo;Web3
                Utilities&rdquo;). It is a condition of the User&rsquo;s use of
                the Website and the Services that the User only operate such
                Web3 Utilities with a private key(s) that the User created or
                has the direct, explicit permission of the party who created the
                relevant private key(s).
                <br />
                <br />
                The User agrees that all information it provides to interact
                with the Website, Interface, Services, or otherwise, including,
                but not limited to, through the use of any interactive features
                on the Website is correct, current, and complete. The User
                consents to all actions we take with respect to the User&rsquo;s
                information as is consistent with these Terms of Use and all
                documents referenced or incorporated herein.
                <br />
                <br />
                If the User utilizes a Web3 Utility that relies on a separate
                username, password, private key, or any other piece of
                information as part of its security procedures, the User must
                treat such information as confidential, and the User must not
                disclose that information to any other person or entity. The
                User also acknowledges that any identity linked to its Web3
                Utility is personal to the User and agrees not to provide any
                other person with access to such identity. The User also agrees
                to ensure that it will lock or otherwise prevent its Web3
                Utility from unauthorized use on this Website or the Services at
                the end of each session. The User should use particular caution
                when accessing the Website or the Services from a public or
                shared computer so that others are not able to view or record
                the User&rsquo;s username, password, private key, or other
                personal information. In the event the User&rsquo;s Web3
                credentials are compromised, the User acknowledges and
                understands that all of its related crypto-assets may be
                compromised as well, and waives any and all responsibility of
                and liability against Intuition related to any losses in any
                such event.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Interaction with other users on the Services
              </span>
              <span className="c1">
                . The Website is a user interface for displaying content created
                by other users. We do not verify, endorse, or assume
                responsibility for any content, contracts, or applications
                introduced or created by users. Users must exercise caution and
                conduct their due diligence before interacting with any
                contracts or applications.
                <br />
                <br />
                You are responsible for your interactions with other users on
                the Services. While we reserve the right to monitor interactions
                between users of our Services, we are not obligated to do so,
                and we cannot be held liable for your interactions with other
                users, or for any user&rsquo;s actions or inactions. If you have
                a dispute with one or more users, you release us (and our
                affiliates and subsidiaries, and our and their respective
                officers, directors, employees and agents) from claims, demands
                and damages (actual and consequential) of every kind and nature,
                known and unknown, arising out of or in any way connected with
                such disputes. In entering into this release you expressly waive
                any protections (whether statutory or otherwise) that would
                otherwise limit the coverage of this release to include only
                those claims which you may know or suspect to exist in your
                favor at the time of agreeing to this release.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Restrictions on Your Use of the Service
              </span>
              <span className="c1">
                . You may not do any of the following, unless applicable laws or
                regulations prohibit these restrictions or you have our written
                permission to do so:
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-2 start" start={1}>
            <li className="c5 li-bullet-0">
              <span className="c1">
                submit, transmit, display, perform, post or store any content
                that is inaccurate, unlawful, defamatory, obscene, lewd,
                lascivious, filthy, excessively violent, pornographic, invasive
                of privacy or publicity rights, harassing, threatening, abusive,
                inflammatory, harmful, hateful, cruel or insensitive, deceptive,
                or otherwise objectionable, use the Services for illegal,
                harassing, bullying, unethical or disruptive purposes, or
                otherwise use the Services in a manner that is obscene, lewd,
                lascivious, filthy, excessively violent, harassing, harmful,
                hateful, cruel or insensitive, deceptive, threatening, abusive,
                inflammatory, pornographic, inciting, organizing, promoting or
                facilitating violence or criminal or harmful activities,
                defamatory, obscene or otherwise objectionable;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                use the Services for the purpose of exploiting, harming, or
                attempting to exploit or harm minors in any way by exposing them
                to inappropriate content, asking for personally identifiable
                information, or otherwise;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                promote any illegal activity, or advocate, promote, or assist
                any unlawful act;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                cause needless annoyance, inconvenience, or anxiety, or be
                likely to unreasonably upset, embarrass, alarm, or annoy any
                other person;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                duplicate, decompile, reverse engineer, disassemble, or decode
                the Services (including any underlying idea or algorithm), or
                attempt to do any of the same;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                use, reproduce or remove any copyright, trademark, service mark,
                trade name, slogan, logo, image, or other proprietary notation
                displayed on or through the Services;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                use the Services in such a way as to infringe the privacy,
                intellectual property rights or other rights of third parties;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                use automation software (bots), hacks, modifications (mods) or
                any other unauthorized third party software designed to modify
                the Services;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                use any robot, spider, crawlers, scraper, or other automatic
                device, process, software, or queries that intercepts,
                &ldquo;mines,&rdquo; scrapes, extracts, or otherwise accesses
                the Services to monitor, extract, copy, or collect information
                or data from or through the Services, or engage in any manual
                process to do the same;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                access or use the Services in any manner that could disable,
                overburden, damage, disrupt, or impair the Services or interfere
                with any other party&rsquo;s access to or use of the Services or
                use any device, software or routine that causes the same;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                attempt to gain unauthorized access to, interfere with, damage
                or disrupt the Services, accounts registered to other users, or
                the computer systems or networks connected to the Services;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                circumvent, remove, alter, deactivate, degrade, or thwart any
                technological measure
              </span>
              <span>, </span>
              <span className="c12">
                content protections, or restrictions prohibiti
              </span>
              <span>ng impermissible access to</span>
              <span className="c12">&nbsp;the Services;</span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                introduce any viruses, trojan horses, worms, logic bombs, or
                other materials that are malicious or technologically harmful
                into our systems;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                deceive or defraud, or attempt to deceive or defraud, any
                person, including (without limitation) providing any false,
                inaccurate, or misleading information (whether directly through
                the Services or through an external means that affects the
                Protocol) with the intent to unlawfully obtain the property of
                another or to provide knowingly or recklessly false information,
                including in any way that causes inaccuracy among the content on
                the Website or on the Services;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                impersonate any person, or misrepresent the User&rsquo;s
                affiliation with any person or organization in connection with
                its use of the Website and Services;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                provide the Company with the personal information of any persons
                under the age of 13 for delivery or any other reason;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                violate any applicable law or regulation in connection with your
                access to or use of the Services (including, without limitation,
                any laws regarding the export of data or software to and from
                the US and other countries);
              </span>
              <span className="c12 c19">&nbsp;</span>
              <span className="c12">or</span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                access or use the Services in any way not expressly permitted by
                these Terms.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1" start={4}>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Monitoring and Enforcement; Termination
              </span>
              <span>.</span>
              <span className="c6">&nbsp;</span>
              <span className="c1">
                We reserve the right to remove any content, file or image deemed
                in violation of these Terms at our sole discretion and assume no
                liability for loss incurred through uploading or otherwise
                interacting with content in violation of our Terms of Service.
                <br />
                <br />
                We may also Terminate or suspend your access to all or part of
                the Website for any or no reason, including without limitation,
                any violation of these Terms of Use, and may further take
                appropriate legal action, including without limitation, referral
                to law enforcement, for any illegal or unauthorized use of the
                Website.
                <br />
                <br />
                Without limiting the foregoing, We have the right to cooperate
                fully with any law enforcement authorities or court order
                requesting or directing us to disclose the identity or other
                information of anyone posting any materials on or through the
                Website. BY USING THE SERVICES, YOU WAIVE AND HOLD HARMLESS
                COMPANY AND ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS
                FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE
                FOREGOING PARTIES DURING, OR TAKEN AS A CONSEQUENCE OF,
                INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT
                AUTHORITIES.
                <br />
                <br />
                However, we cannot review interactions or activities before they
                are executed through the Website, and, given the nature of
                blockchain and functionalities like those offered via the
                Services, cannot ensure prompt removal or rectification of
                objectionable interactions or activities after they have been
                executed. Accordingly, the User agrees that we assume no
                liability for any action or inaction regarding transmissions,
                communications, transactions, blockchain operations, or content
                provided by any Participant or third party, including any that
                may cause a malfunction or inaccuracy on the Website or among
                the Services. We have no liability or responsibility to anyone
                for any other party&rsquo;s performance or nonperformance of the
                activities described in this Section, nor for any harms or
                damages created by others&rsquo; interactions with any
                blockchain underlying the Services or reliance on the
                information or content presented on the Website.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={6}>
            <li className="c9 li-bullet-0">
              <h1 id="h.s32s21zoksm" className="inline">
                <span className="c0">OWNERSHIP AND CONTENT</span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Ownership of the Services</span>
              <span className="c1">
                . The Services, including their &ldquo;look and feel&rdquo;
                (e.g., text, graphics, images, logos), proprietary content,
                information and other materials, are protected under copyright,
                trademark and other intellectual property laws. You agree that
                the Company and/or its licensors own all right, title and
                interest in and to the Services and you agree not to take any
                action(s) inconsistent with such ownership interests. We and our
                licensors reserve all rights in connection with the Services and
                its content, including the right to create derivative works.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Ownership of Trademarks</span>
              <span className="c1">
                . The Company&rsquo;s name, trademarks, the Company&rsquo;s
                logo, and all related names, logos, product and service names,
                designs and slogans are trademarks of the Company or its
                affiliates or licensors. Other names, logos, product and service
                names, designs, and slogans that appear on the Services are the
                property of their respective owners, who may or may not be
                affiliated with, connected to, or sponsored by us.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={7}>
            <li className="c17 li-bullet-0">
              <h1 id="h.m4uij41phr5g" className="inline">
                <span className="c0">WEBSITE CONTENT AND INFORMATION</span>
              </h1>
            </li>
          </ol>
          <p className="c10 c22">
            <span className="c0"></span>
          </p>
          <ol className="c2 lst-kix_v61pi1glm5bt-1" start={3}>
            <li className="c4 li-bullet-0">
              <span className="c7">Reliance on Information Posted</span>
              <span>
                . The content and information presented on or through the
                Website (including, without limitation, on the Interface) is
                made available solely for general information and education
                purposes. We do not warrant the accuracy, completeness, or
                usefulness of this information. Any information posted to the
                Website or through the Services should not be construed as an
                intention to form a contract, and in no case should any
                information be construed as Company&rsquo;s offer to buy, sell,
                or exchange crypto-assets. Any reliance the User places on such
                information is strictly at the User&rsquo;s own risk, and as is
                common in the blockchain space, the User is assuming a high
                amount of risk related to others or technical harms when
                operating via the Website, the Interface, and the Services. We
                disclaim all liability and responsibility arising from any
                reliance placed on such materials by the User or any other
                Participant, by anyone who may be informed of any of the
                Website&rsquo;s or the Services&rsquo; contents, or by the
                actions or omissions of others interacting with the Protocol or
                any underlying blockchain.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Use of Third Party Materials in the Services
              </span>
              <span>
                . Certain Services may display, include or make available
                content, data, information, applications or materials from third
                parties (&ldquo;
              </span>
              <span className="c6">Third Party Materials</span>
              <span className="c1">
                &rdquo;) or provide links to certain third party websites (such
                as Twitter, Discord, NFT marketplaces or decentralized
                exchanges). By using the Services, you acknowledge and agree
                that the Company is not responsible for examining or evaluating
                the content, accuracy, completeness, availability, timeliness,
                validity, copyright compliance, legality, decency, quality or
                any other aspect of such Third Party Materials or websites. We
                do not warrant or endorse and do not assume and will not have
                any liability or responsibility to you or any other person for
                any third party services, Third Party Materials or third party
                websites, or for any other materials, products, or services of
                third parties. Third Party Materials and links to other websites
                are provided solely as a convenience to you.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">No Professional Advice</span>
              <span>. </span>
              <span className="c1">
                All information or content provided or displayed by the Website
                (including, without limitation, on the Interface) is for
                informational purposes only and should not be construed as
                professional advice (including, without limitation, tax, legal,
                or financial advice). The User should not take or refrain from
                taking any action based on any information or content displayed
                or provided on the Website, on the Interface, or through the
                Services. The User should seek independent professional advice
                from an individual licensed and competent in the appropriate
                area before the User makes any financial, legal, or other
                decisions where such should be considered prudent. The User
                acknowledges and agrees that, to the fullest extent permissible
                by law, it has not relied on Intuition, the content on the
                Website, the Interface, or the Services for any professional
                advice related to its financial or legal behaviors.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Claims of Intellectual Property Violations and Copyright
                Infringement
              </span>
              <span className="c1">
                . We respond to notices of alleged copyright infringement under
                the United States Digital Millennium Copyright Act. Our team
                works to ensure that content on our Website or in our app does
                not infringe upon the copyright, trademark, or certain other
                intellectual property rights of third parties. If you believe
                that your intellectual property rights have been infringed,
                please notify support@intuition.systems and we will investigate.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={8}>
            <li className="c9 li-bullet-0">
              <h1 id="h.75sckzu9p7lo" className="inline">
                <span className="c0">
                  DISCLAIMERS, LIMITATIONS OF LIABILITY, AND INDEMNIFICATION
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Disclaimers</span>
              <span className="c1">. </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-2 start" start={1}>
            <li className="c5 li-bullet-0">
              <span>
                Your access to and use of the Services are at your own risk. You
                understand and agree that the Services are provided to you on an
                &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis.
                Without limiting the foregoing, to the maximum extent permitted
                under applicable law, the Company, its parents, affiliates,
                related companies, officers, directors, employees, agents,
                representatives, partners and licensors (the &ldquo;
              </span>
              <span className="c6">the Company Entities</span>
              <span className="c1">
                &rdquo;) DISCLAIM ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS
                OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
                OR NON-INFRINGEMENT. The Company Entities make no warranty or
                representation and disclaim all responsibility and liability
                for: (a) the completeness, accuracy, availability, timeliness,
                security or reliability of the Services; (b) any harm to your
                computer system, loss of data, or other harm that results from
                your access to or use of the Services; (c) the operation or
                compatibility with any other application or any particular
                system or device; and (d) whether the Services will meet your
                requirements or be available on an uninterrupted, secure or
                error-free basis. No advice or information, whether oral or
                written, obtained from the Company Entities or through the
                Services, will create any warranty or representation not
                expressly made herein.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                THE LAWS OF CERTAIN JURISDICTIONS, INCLUDING THE STATE OF NEW
                JERSEY, DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
                EXCLUSION OR LIMITATION OF CERTAIN DAMAGES AS SET FORTH IN
                SECTION 9.2 BELOW. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF
                THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY
                TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                THE COMPANY ENTITIES TAKE NO RESPONSIBILITY AND ASSUME NO
                LIABILITY FOR ANY CONTENT THAT YOU, ANOTHER USER, OR A THIRD
                PARTY CREATES, UPLOADS, POSTS, SENDS, RECEIVES, OR STORES ON OR
                THROUGH OUR SERVICES.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                YOU UNDERSTAND AND AGREE THAT YOU MAY BE EXPOSED TO CONTENT THAT
                MIGHT BE OFFENSIVE, ILLEGAL, MISLEADING, OR OTHERWISE
                INAPPROPRIATE, NONE OF WHICH THE COMPANY ENTITIES WILL BE
                RESPONSIBLE FOR.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1" start={2}>
            <li className="c4 li-bullet-0">
              <span className="c7">Limitations of Liability</span>
              <span className="c1">
                . TO THE EXTENT NOT PROHIBITED BY LAW, YOU AGREE THAT IN NO
                EVENT WILL THE COMPANY ENTITIES BE LIABLE (A) FOR DAMAGES OF ANY
                KIND, INCLUDING INDIRECT SPECIAL, EXEMPLARY, INCIDENTAL,
                CONSEQUENTIAL OR PUNITIVE DAMAGES (INCLUDING, BUT NOT LIMITED
                TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE,
                DATA OR PROFITS, BUSINESS INTERRUPTION OR ANY OTHER
                &nbsp;DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO YOUR USE
                OR INABILITY TO USE THE SERVICES), HOWEVER CAUSED AND UNDER ANY
                THEORY OF LIABILITY, WHETHER UNDER THESE TERMS OR OTHERWISE
                ARISING IN ANY WAY IN CONNECTION WITH THE SERVICES OR THESE
                TERMS AND WHETHER IN CONTRACT, STRICT LIABILITY OR TORT
                (INCLUDING NEGLIGENCE OR OTHERWISE) EVEN IF THE COMPANY ENTITIES
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE, OR (B) FOR
                ANY OTHER CLAIM, DEMAND OR DAMAGES WHATSOEVER RESULTING FROM OR
                ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE
                DELIVERY, USE OR PERFORMANCE OF THE SERVICES. &nbsp;THE COMPANY
                ENTITIES&rsquo; TOTAL LIABILITY TO YOU FOR ANY DAMAGES FINALLY
                AWARDED SHALL NOT EXCEED THE GREATER OF ONE HUNDRED DOLLARS
                ($100.00), OR THE AMOUNT YOU PAID THE COMPANY ENTITIES, IF ANY,
                IN THE PAST SIX (6) MONTHS FOR THE SERVICES (OR OFFERINGS
                PURCHASED ON THE SERVICES) GIVING RISE TO THE CLAIM. THE
                FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY
                FAILS OF ITS ESSENTIAL PURPOSE.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Indemnification</span>
              <span className="c1">
                . By entering into these Terms and accessing or using the
                Services, you agree that you shall defend, indemnify and hold
                the Company Entities harmless from and against any and all
                claims, costs, damages, losses, liabilities and expenses
                (including attorneys&rsquo; fees and costs) incurred by the
                Company Entities arising out of or in connection with: (a) your
                violation or breach of any term of these Terms or any applicable
                law or regulation; (b) your violation of any rights of any third
                party; (c) your misuse of the Services; or (d) your negligence
                or wilful misconduct. If you are obligated to indemnify any
                Company Entity hereunder, then you agree that Company (or, at
                its discretion, the applicable Company Entity) will have the
                right, in its sole discretion, to control any action or
                proceeding and to determine whether Company wishes to settle,
                and if so, on what terms, and you agree to fully cooperate with
                Company in the defense or settlement of such claim.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Acknowledgement: Assumption of Risks</span>
              <span className="c1">.</span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-2 start" start={1}>
            <li className="c5 li-bullet-0">
              <span>
                By using the Services, you acknowledge that blockchains,
                decentralized exchanges, decentralized finance, crypto-assets,
                the Protocol, and their related technologies and functionalities
                are still emerging innovations that carry a relatively high
                amount of foreseeable and unforeseeable risk from security,
                financial, technical, political, social, and personal safety
                standpoints. The speed and cost of transacting with
                cryptographic technologies, such as blockchains like those
                underlying the Protocol, are variable and highly volatile.
                Moreover, the transparent nature of many blockchains means that
                any interactions the User has with the Protocol and any
                blockchain may be publicly visible and readable in human form.{' '}
              </span>
              <span className="c6">
                The Website and Services are still in beta and Users acknowledge
                the elevated risk associated with early testing of the Website,
                the Interface, the Services, and the Protocol
              </span>
              <span className="c1">.</span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                Crypto-assets are highly volatile in nature due to many diverse
                factors, including without limitation use and adoption,
                speculation, manipulation, technology, security, and legal and
                regulatory developments and application. We do not provide any
                kind of insurance to you against any type of loss, including
                (without limitation) losses due to decrease in value of assets,
                assets lost due to a cybersecurity failure, or from your or
                other individuals&rsquo; errors or malfeasance. You acknowledge
                that cryptocurrencies and other similar digital assets are
                neither (i) deposits of or guaranteed by a bank nor (ii) insured
                by the FDIC or by any other governmental agency. Further, you
                agree that Company&rsquo;s Services are not to be used as a
                substitute for currency or medium of exchange, or redistribution
                and that you are not acquiring any equity or other ownership or
                revenue sharing interest in the Company, its affiliates, or any
                brand as a result of your use of the Services.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                The mere access to and interaction with blockchains requires
                high degrees of skill and knowledge to operate with a relative
                degree of safety and proficiency. By accessing and using the
                Website or the Services, the User acknowledges the foregoing,
                and agrees and represents that it understands and assumes such
                and other risks involved with blockchains, decentralized
                finance, the Protocol, and related technologies (including
                without limitation any specific technical language used in this
                Agreement). You acknowledge that there are inherent risks
                associated with using or interacting with public blockchains and
                blockchain technology. There is no guarantee that such
                technology will be unavailable or subject to errors, hacking or
                other security risks. Underlying blockchain protocols may also
                be subject to sudden changes in operating rules, including
                forks, and it is your responsibility to make yourself aware of
                upcoming operating changes.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                The User represents that it has sufficient knowledge and
                experience in business and financial matters, including a
                sufficient understanding of blockchain technologies, digital
                assets, storage mechanisms (such as Wallets), and
                blockchain-based software systems to be able to assess and
                evaluate the risks and benefits of the Services contemplated
                hereunder, and will bear the risks thereof, including loss of
                all amounts paid, and the risk that digital assets may have
                little or no value. You acknowledge and agree that there are
                risks associated with purchasing and holding digital assets and
                using blockchain technology. These including, but are not
                limited to, risk of losing access to digital assets due to loss
                of private key(s), custodial error or purchaser error, risk of
                mining or blockchain attacks, risk of hacking and security
                weaknesses, risk of unfavorable regulatory intervention in one
                or more jurisdictions, risks related to token taxation, risk of
                personal information disclosure, risk of uninsured losses,
                unanticipated risks, and volatility risks.
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c12">
                We will use commercially reasonable efforts to use secure and
                functional smart contracts, however, we will not be liable or
                responsible to you for any failure in the intended function of
                such smart contracts, or any bugs, viruses, exploits, logic
                gaps, or malicious code which may be incorporated into any such
                smart contracts, or which could be used to commit fraud or
                otherwise cause harm. You acknowledge that you have obtained
                sufficient information to make an informed decision to interact
                with relevant smart contracts, including carefully reviewing the
                code of the smart contracts, and fully understand and accept the
                functions of the same. Smart contracts execute automatically
                when certain conditions are met. We do not have the ability to
                reverse a transaction that is recorded on a public blockchain.
                You are responsible for ensuring that any details{' '}
              </span>
              <span>entered</span>
              <span className="c1">
                &nbsp;in connection with a transaction using any smart contracts
                are accurate and complete. We are not responsible for any losses
                due to your errors, including an incorrectly constructed
                transaction.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={9}>
            <li className="c9 li-bullet-0">
              <h1 id="h.ir4t1q6ixcix" className="inline">
                <span className="c0">
                  ARBITRATION AND CLASS ACTION WAIVER
                  <br />
                  <br />
                  PLEASE READ THIS SECTION CAREFULLY &ndash; IT MAY
                  SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT
                  TO FILE A LAWSUIT IN COURT AND TO HAVE A JURY HEAR YOUR
                  CLAIMS. IT CONTAINS PROCEDURES FOR MANDATORY BINDING
                  ARBITRATION AND A CLASS ACTION WAIVER.
                </span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Informal Process First</span>
              <span className="c1">
                . You and the Company agree that in the event of any dispute,
                either party will first contact the other party and make a good
                faith sustained effort to resolve the dispute before resorting
                to more formal means of resolution, including without
                limitation, any court action, after first allowing the receiving
                party 30 days in which to respond. Both you and the Company
                agree that this dispute resolution procedure is a condition
                precedent which must be satisfied before initiating any
                arbitration against the other party.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">
                Arbitration Agreement and Class Action Waiver
              </span>
              <span>
                . After the informal dispute resolution process, any remaining
                dispute, controversy, or claim (collectively, &ldquo;
              </span>
              <span className="c6">Claim</span>
              <span>
                &rdquo;) relating in any way to the Company&rsquo;s services
                and/or products, including the Services, and any use or access
                or lack of access thereto, will be resolved by arbitration,
                including threshold questions of arbitrability of the Claim. You
                and the Company agree that any Claim will be settled by final
                and binding arbitration, using the English language,
                administered by JAMS
              </span>
              <span className="c6">&nbsp;</span>
              <span>
                under its Comprehensive Arbitration Rules and Procedures (the
                &ldquo;
              </span>
              <span className="c6">JAMS Rules</span>
              <span>
                &rdquo;) then in effect (those rules are deemed to be
                incorporated by reference into this section, and as of the date
                of these Terms). &nbsp;Because your contract with the Company,
                these Terms, and this Arbitration Agreement concern interstate
                commerce, the Federal Arbitration Act (&ldquo;FAA&rdquo;)
                governs the arbitrability of all disputes. However, the
                arbitrator will apply applicable substantive law consistent with
                the FAA and the applicable statute of limitations or condition
                precedent to suit.{' '}
              </span>
              <span className="c6">
                Arbitration will be handled by a sole arbitrator in accordance
                with the JAMS Rules. Judgment on the arbitration award may be
                entered in any court that has jurisdiction. Any arbitration
                under these Terms will take place on an individual basis &ndash;
                class arbitrations and class actions are not permitted. You
                understand that by agreeing to these Terms, you and the Company
                are each waiving the right to trial by jury or to participate in
                a class action or class arbitration.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Exceptions</span>
              <span className="c1">
                . Notwithstanding the foregoing, you and the Company agree that
                the following types of disputes will be resolved in a court of
                proper jurisdiction:
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-2 start" start={1}>
            <li className="c5 li-bullet-0">
              <span className="c1">
                Disputes or claims within the jurisdiction of a small claims
                court consistent with the jurisdictional and dollar limits that
                may apply, as long as it is brought and maintained as an
                individual dispute and not as a class, representative, or
                consolidated action or proceeding;
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">
                Disputes or claims where the sole form of relief sought is
                injunctive relief (including public injunctive relief); or
              </span>
            </li>
            <li className="c5 li-bullet-0">
              <span className="c1">Intellectual property disputes.</span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1" start={4}>
            <li className="c4 li-bullet-0">
              <span className="c7">Costs of Arbitration</span>
              <span className="c1">
                . Payment of all filing, administration, and arbitrator costs
                and expenses will be governed by the JAMS Rules, except that if
                you demonstrate that any such costs and expenses owed by you
                under those rules would be prohibitively more expensive than a
                court proceeding, the Company will pay the amount of any such
                costs and expenses that the arbitrator determines are necessary
                to prevent the arbitration from being prohibitively more
                expensive than a court proceeding (subject to possible
                reimbursement as set forth below). <br />
                <br />
                Fees and costs may be awarded as provided pursuant to applicable
                law. If the arbitrator finds that either the substance of your
                claim or the relief sought in the demand is frivolous or brought
                for an improper purpose (as measured by the standards set forth
                in Federal Rule of Civil Procedure 11(b)), then the payment of
                all fees will be governed by the JAMS rules. In that case, you
                agree to reimburse the Company for all monies previously
                disbursed by it that are otherwise your obligation to pay under
                the applicable rules. If you prevail in the arbitration and are
                awarded an amount that is less than the last written settlement
                amount offered by the Company before the arbitrator was
                appointed, the Company will pay you the amount it offered in
                settlement. &nbsp;The arbitrator may make rulings and resolve
                disputes as to the payment and reimbursement of fees or expenses
                at any time during the proceeding and upon request from either
                party made within 14 days of the arbitrator&rsquo;s ruling on
                the merits.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Opt-Out</span>
              <span className="c1">
                . You have the right to opt-out and not be bound by the
                arbitration provisions set forth in these Terms by sending
                written notice of your decision to opt-out
                to&nbsp;support@intuition.systems. The notice must be sent to
                the Company within thirty (30) days of your first registering to
                use the Services or agreeing to these Terms; otherwise you shall
                be bound to arbitrate disputes on a non-class basis in
                accordance with these Terms. If you opt out of only the
                arbitration provisions, and not also the class action waiver,
                the class action waiver still applies. You may not opt out of
                only the class action waiver and not also the arbitration
                provisions. &nbsp;If you opt-out of these arbitration
                provisions, the Company also will not be bound by them.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7 c6">
                WAIVER OF RIGHT TO BRING CLASS ACTION AND REPRESENTATIVE CLAIMS
              </span>
              <span>
                . To the fullest extent permitted by applicable law, you and the
                Company each agree that any proceeding to resolve any dispute,
                claim, or controversy will be brought and conducted ONLY IN THE
                RESPECTIVE PARTY&rsquo;S INDIVIDUAL CAPACITY AND NOT AS PART OF
                ANY CLASS (OR PURPORTED CLASS), CONSOLIDATED,
                MULTIPLE-PLAINTIFF, OR REPRESENTATIVE ACTION OR PROCEEDING
                (&ldquo;CLASS ACTION&rdquo;). You and the Company AGREE TO WAIVE
                THE RIGHT TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY
                CLASS ACTION. You and the Company EXPRESSLY WAIVE ANY ABILITY TO
                MAINTAIN A CLASS ACTION IN ANY FORUM. &nbsp;If the dispute is
                subject to arbitration, THE ARBITRATOR WILL NOT HAVE THE
                AUTHORITY TO COMBINE OR AGGREGATE CLAIMS, CONDUCT A CLASS
                ACTION, OR MAKE AN AWARD TO ANY PERSON OR ENTITY NOT A PARTY TO
                THE ARBITRATION. Further, you and the Company agree that the
                ARBITRATOR MAY NOT CONSOLIDATE PROCEEDINGS FOR MORE THAN ONE
                PERSON&rsquo;S CLAIMS, AND IT MAY NOT OTHERWISE PRESIDE OVER ANY
                FORM OF A CLASS ACTION. For the avoidance of doubt, however, you
                can seek public injunctive relief to the extent authorized by
                law and consistent with the Exceptions clause above.
              </span>
              <span className="c6">
                <br />
                <br />
              </span>
              <span className="c1">
                IF THIS CLASS ACTION WAIVER IS LIMITED, VOIDED, OR FOUND
                UNENFORCEABLE, THEN, UNLESS THE PARTIES MUTUALLY AGREE
                OTHERWISE, THE PARTIES&rsquo; AGREEMENT TO ARBITRATE SHALL BE
                NULL AND VOID WITH RESPECT TO SUCH PROCEEDING SO LONG AS THE
                PROCEEDING IS PERMITTED TO PROCEED AS A CLASS ACTION. &nbsp;If a
                court decides that the limitations of this paragraph are deemed
                invalid or unenforceable, any putative class, private attorney
                general, or consolidated or representative action must be
                brought in a court of proper jurisdiction and not in
                arbitration.
              </span>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-0" start={10}>
            <li className="c9 li-bullet-0">
              <h1 id="h.8hgf2omby0vc" className="inline">
                <span className="c0">ADDITIONAL PROVISIONS</span>
              </h1>
            </li>
          </ol>
          <ol className="c2 lst-kix_v61pi1glm5bt-1 start" start={1}>
            <li className="c4 li-bullet-0">
              <span className="c7">Updating These Terms</span>
              <span className="c1">
                . We may modify these Terms from time to time in which case we
                will update the &ldquo;Last Revised&rdquo; date at the top of
                these Terms. If we make changes that are material, we will use
                reasonable efforts to attempt to notify you, such as by email
                and/or by placing a prominent notice on the first page of the
                Website. However, it is your sole responsibility to review these
                Terms from time to time to view any such changes. The updated
                Terms will be effective as of the time of posting, or such later
                date as may be specified in the updated Terms. Your continued
                access or use of the Services after the modifications have
                become effective will be deemed your acceptance of the modified
                Terms. &nbsp;No amendment shall apply to a dispute for which
                arbitration has been initiated prior to the change in Terms.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Termination of Services</span>
              <span className="c1">
                . The Company may suspend or disable your access to the Services
                (or any part of the foregoing) with or without notice, for any
                or no reason. All sections which by their nature should survive
                the termination of these Terms shall continue in full force and
                effect subsequent to and notwithstanding any termination of
                these Terms by the Company or you. Termination will not limit
                any of the Company&rsquo;s other rights or remedies at law or in
                equity.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Injunctive Relief</span>
              <span className="c1">
                . You agree that a breach of these Terms will cause irreparable
                injury to the Company for which monetary damages would not be an
                adequate remedy and the Company shall be entitled to equitable
                relief in addition to any remedies it may have hereunder or at
                law without a bond, other security or proof of damages.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">California Residents</span>
              <span className="c1">
                . If you are a California resident, in accordance with Cal. Civ.
                Code &sect; 1789.3, you may report complaints to the Complaint
                Assistance Unit of the Division of Consumer Services of the
                California Department of Consumer Affairs by contacting them in
                writing at 1625 North Market Blvd., Suite N 112 Sacramento, CA
                95834, or by telephone at (800) 952-5210.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Force Majeure</span>
              <span className="c1">
                . We will not be liable or responsible to you, nor be deemed to
                have defaulted under or breached these Terms, for any failure or
                delay in fulfilling or performing any of our obligations under
                these Terms or in providing the Services, including operating
                the Website, when and to the extent such failure or delay is
                caused by or results from any events beyond our ability to
                control, including acts of God, flood, fire, earthquake,
                epidemics, pandemics, tsunami, explosion, war, invasion,
                hostilities (whether war is declared or not), terrorist threats
                or acts, riot or other civil unrest, government order, law, or
                action, embargoes or blockades, strikes, labor stoppages or
                slowdowns or other industrial disturbances, shortage of adequate
                or suitable Internet connectivity, telecommunication breakdown
                or shortage of adequate power or electricity, and other similar
                events beyond our control.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">No Fiduciary Duties</span>
              <span className="c1">
                . These Terms of Use, and the provision of the Website and the
                Services, are not intended to create any fiduciary duties
                between us and the User or any third party. The Company never
                takes possession, custody, control, ownership, or management of
                any crypto-assets or other property transmitted via the
                Interface. To the fullest extent permissible by law, the User
                agrees that neither the User&rsquo;s use of the Website or the
                Services causes us or any Participant to owe fiduciary duties or
                liabilities to the User or any third party. Further, the User
                acknowledges and agrees to the fullest extent such duties or
                liabilities are afforded by law or by equity, those duties and
                liabilities are hereby irrevocably disclaimed, waived, and
                eliminated, and that we and any other Participant shall be held
                completely harmless in relation thereof. The User further agrees
                that the only duties and obligations that we owe the User, and
                the only rights the User has related to this Agreement or the
                User&rsquo;s use of the Website or the Services, are those set
                out expressly in this Agreement or that cannot be waived by law.
                Further, the User agrees and understands that they are
                responsible for all applicable reporting requirements and
                deadlines, including taxes and relevant fees, and that we owe
                Users no affirmative duties with respect to said reporting
                requirements and deadlines.
              </span>
            </li>
            <li className="c4 li-bullet-0">
              <span className="c7">Miscellaneous</span>
              <span>
                . If any provision of these Terms shall be unlawful, void or for
                any reason unenforceable, then that provision shall be deemed
                severable from these Terms and shall not affect the validity and
                enforceability of any remaining provisions. These Terms and the
                licenses granted hereunder may be assigned by the Company but
                may not be assigned by you without the prior express written
                consent of the Company. No waiver by either party of any breach
                or default hereunder shall be deemed to be a waiver of any
                preceding or subsequent breach or default. The section headings
                used herein are for reference only and shall not be read to have
                any legal effect. The Services are operated by us in the United
                States. Those who choose to access the Services from locations
                outside the United States do so at their own initiative and are
                responsible for compliance with applicable local laws. These
                Terms are governed by the laws of the State of New York, without
                regard to conflict of laws rules, and the proper venue for any
                disputes arising out of or relating to any of the same will be
                the arbitration venue set forth in Section 10, or if arbitration
                does not apply, then the state and federal courts located in New
                York. You and the Company agree that the United Nations
                Convention on Contracts for the International Sale of Goods will
                not apply to the interpretation or construction of these Terms.
              </span>
              <span className="c6">&nbsp;</span>
            </li>
            <li className="c4 li-bullet-0 mb-20">
              <span className="c7">How to Contact Us</span>
              <span>
                . &nbsp;You may contact us regarding the Services or these Terms
                by{' '}
              </span>
              <span>email</span>
              <span className="c1">&nbsp;at support@intuition.systems.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
