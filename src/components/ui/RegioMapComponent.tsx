export default function RegionMap() {
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    const region = target.id;

    if (region) {
      console.log("✅ 클릭된 지역:", region); // ex) "전라도", "강원도"
      // 여기서 라우터 이동도 가능:
      // router.push(`/region/${region}`);
    }
  };
  return (
    <svg
      onClick={handleClick}
      width="485"
      height="771"
      viewBox="0 0 485 771"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1175_19993)" filter="url(#filter0_d_1175_19993)">
        <path
          id="전라도"
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M232.117 395.894H58.7221V425.306C58.7221 430.799 54.256 435.254 48.7494 435.254H36.8255C30.018 435.254 24.5547 440.748 24.5547 447.495V617.394C24.5547 630.932 35.568 641.919 49.1396 641.919H202.199C207.706 641.919 212.172 637.464 212.172 631.97V606.797C212.172 601.304 216.638 596.849 222.145 596.849H232.117V395.851V395.894Z"
          fill="white"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          id="경상도"
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M427.972 292.691V217.041H278.035V383.609C278.035 390.4 272.528 395.85 265.764 395.85H232.16V596.935H445.967C455.896 596.935 463.917 588.89 463.917 579.028V322.882C463.917 312.977 455.853 304.975 445.967 304.975H440.286C433.479 304.975 428.016 299.482 428.016 292.734L427.972 292.691Z"
          fill="white"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          id="충청도"
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M21.0859 242.561V314.578C21.0859 321.368 26.5926 326.818 33.3567 326.818H45.931C52.7385 326.818 58.2018 332.311 58.2018 339.059V395.807H265.721C272.528 395.807 277.992 390.314 277.992 383.567V242.518H21.0859V242.561Z"
          fill="white"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          id="강원도"
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M290.349 17.0811H415.702C422.466 17.0811 427.973 22.5742 427.973 29.3217V216.998H278.035V29.3217C278.035 22.5742 283.542 17.0811 290.306 17.0811H290.349Z"
          fill="white"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          id="서울경기인천"
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M45.6709 51.6406H265.764C272.529 51.6406 278.035 57.1338 278.035 63.8813V242.517H21.0859V76.1653C21.0859 62.627 32.0993 51.6406 45.6709 51.6406Z"
          fill="white"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M21.0859 242.561H278.035"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M278.032 63.9248V383.61C278.032 390.401 272.526 395.851 265.761 395.851H58.2422"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M278.035 217.041H427.973"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M232.117 395.894V596.978"
          stroke="#EEEEEE"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <g clipPath="url(#clip1_1175_19993)">
          <path
            d="M321.133 175.906V196.224V216.584H296.762L309.541 196.224L321.133 175.906Z"
            fill="#9CB57D"
          />
          <path
            d="M321.133 175.906V196.224V216.584H344.277L332.724 196.224L321.133 175.906Z"
            fill="#B5CF8F"
          />
        </g>
        <path
          d="M253.027 384.906H255.835V394.011C255.835 394.404 255.538 394.725 255.174 394.725H253.721C253.358 394.725 253.06 394.404 253.06 394.011V384.906H253.027Z"
          fill="#9E6850"
        />
        <path
          d="M254.432 387.712C259.859 387.712 264.258 383.316 264.258 377.893C264.258 372.47 259.859 368.074 254.432 368.074C249.005 368.074 244.605 372.47 244.605 377.893C244.605 383.316 249.005 387.712 254.432 387.712Z"
          fill="#9BB47A"
        />
        <g clipPath="url(#clip2_1175_19993)">
          <path
            d="M225.809 382.315H229.707V393.823C229.707 394.319 229.294 394.725 228.789 394.725H226.772C226.267 394.725 225.854 394.319 225.854 393.823V382.315H225.809Z"
            fill="#9E6850"
          />
          <path
            d="M227.782 385.97C234.772 385.97 240.439 380.394 240.439 373.515C240.439 366.637 234.772 361.061 227.782 361.061C220.792 361.061 215.125 366.637 215.125 373.515C215.125 380.394 220.792 385.97 227.782 385.97Z"
            fill="#9BB47A"
          />
        </g>
        <g clipPath="url(#clip3_1175_19993)">
          <path
            d="M416.886 563.199C417.054 562.549 416.659 561.884 416.003 561.715C415.348 561.546 414.68 561.937 414.512 562.587L406.318 594.32C406.15 594.971 406.545 595.635 407.201 595.804C407.856 595.973 408.524 595.583 408.692 594.932L416.886 563.199Z"
            fill="#D7DBDA"
          />
          <path
            d="M388.591 565.078C392.09 551.529 406.195 543.437 420.076 547.015C433.957 550.594 442.383 564.495 438.884 578.044C438.884 578.044 430.428 574.231 427.451 573.463C424.112 572.602 417.118 572.433 413.738 571.561C410.358 570.69 403.903 567.602 400.473 566.759C397.577 566.012 388.591 565.078 388.591 565.078Z"
            fill="#E6917E"
          />
          <path
            d="M427.451 573.463C431.254 558.736 420.076 547.016 420.076 547.016C420.076 547.016 404.306 551.914 400.473 566.76C400.473 566.76 410.156 570.806 413.546 571.638C416.936 572.47 427.421 573.414 427.421 573.414L427.451 573.463Z"
            fill="#FFFDDE"
          />
        </g>
        <g clipPath="url(#clip4_1175_19993)">
          <path
            d="M113.418 624.902H83V640.195H113.418V624.902Z"
            fill="#EEEBD0"
          />
          <path
            d="M83.093 624.629H57.0469V640.195H83.093V624.629Z"
            fill="#FFFDE8"
          />
          <path
            d="M70.0692 609.336L82.9993 624.902H56.9531L70.0692 609.336Z"
            fill="#FFFDE8"
          />
          <path
            d="M116.86 627.633L83.3724 627.087L70.0703 609.336H99.8373L116.86 627.633Z"
            fill="#E6AA60"
          />
          <path
            d="M55.0938 626.45L55.6519 628.998L71.4656 611.157L70.0703 609.336L55.0938 626.45Z"
            fill="#E6AA60"
          />
        </g>
        <g clipPath="url(#clip5_1175_19993)">
          <path
            d="M64.3555 180.061H58.6208L57.9936 157.671L57.1872 180.061H51.363C45.718 180.061 41.0586 184.663 41.0586 190.238C41.0586 194.663 44.0155 198.38 48.0477 199.796V241.832H67.7604V199.796C71.7925 198.38 74.7494 194.663 74.7494 190.238C74.7494 184.663 70.0901 180.061 64.4451 180.061H64.3555Z"
            fill="#D1EBF3"
          />
          <path
            d="M50.1103 186.698H44.6445V192.097H50.1103V186.698Z"
            fill="#ACD9C5"
          />
          <path
            d="M57.0986 186.698H51.6328V192.097H57.0986V186.698Z"
            fill="#ACD9C5"
          />
          <path
            d="M64.0869 186.698H58.6211V192.097H64.0869V186.698Z"
            fill="#ACD9C5"
          />
          <path
            d="M71.0752 186.698H65.6094V192.097H71.0752V186.698Z"
            fill="#ACD9C5"
          />
          <path
            d="M67.7596 199.796H48.0469V202.539H67.7596V199.796Z"
            fill="#ACD9C5"
          />
        </g>
      </g>
      <g
        id="제주도"
        clipPath="url(#clip6_1175_19993)"
        filter="url(#filter1_d_1175_19993)"
      >
        <path
          className="cursor-pointer hover:fill-blue-200 transition"
          d="M138.989 676H55.0112C35.6751 676 20 691.333 20 710.248V722.752C20 741.667 35.6751 757 55.0112 757H138.989C158.325 757 174 741.667 174 722.752V710.248C174 691.333 158.325 676 138.989 676Z"
          fill="white"
        />
      </g>
      <g clipPath="url(#clip7_1175_19993)">
        <path
          d="M161.636 665.08C161.636 667.72 157.438 669.88 152.17 669.88C146.901 669.88 142.703 667.72 142.703 665.08C142.703 662.44 146.901 659 152.17 659C157.438 659 161.636 662.44 161.636 665.08Z"
          fill="#CFD0D0"
        />
        <path
          d="M149.371 673.8H154.968C160.483 673.8 164.928 678.12 164.928 683.48V706.6C164.928 707.88 163.858 709 162.459 709H141.88C140.563 709 139.41 707.96 139.41 706.6V683.48C139.41 678.12 143.855 673.8 149.371 673.8Z"
          fill="#AEA8A5"
        />
        <path
          d="M154.557 663.24H149.782C145.873 663.24 142.703 666.321 142.703 670.12V674.76C142.703 678.56 145.873 681.64 149.782 681.64H154.557C158.467 681.64 161.636 678.56 161.636 674.76V670.12C161.636 666.321 158.467 663.24 154.557 663.24Z"
          fill="#CFD0D0"
        />
        <path
          d="M165.013 669.08C166.248 668.2 164.272 664.28 161.473 664.28H142.87C140.153 664.28 138.095 668.28 139.412 669.08C142.129 670.84 143.364 666.68 152.172 666.68C160.156 666.68 162.297 670.92 164.931 669.08H165.013Z"
          fill="#ACACAB"
        />
        <path
          d="M148.534 689H142.966C140.775 689 139 690.492 139 692.333C139 694.174 140.775 695.667 142.966 695.667H148.534C150.725 695.667 152.5 694.174 152.5 692.333C152.5 690.492 150.725 689 148.534 689Z"
          fill="#CFD0D0"
        />
        <path
          d="M162.034 685.667H156.466C154.275 685.667 152.5 687.159 152.5 689C152.5 690.841 154.275 692.334 156.466 692.334H162.034C164.225 692.334 166 690.841 166 689C166 687.159 164.225 685.667 162.034 685.667Z"
          fill="#CFD0D0"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1175_19993"
          x="0"
          y="0"
          width="485"
          height="667"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1175_19993"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1175_19993"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_1175_19993"
          x="10"
          y="670"
          width="174"
          height="101"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1175_19993"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1175_19993"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1175_19993">
          <rect
            width="445"
            height="627"
            fill="white"
            transform="translate(20 16)"
          />
        </clipPath>
        <clipPath id="clip1_1175_19993">
          <rect
            width="46.3249"
            height="40.6779"
            fill="white"
            transform="translate(297.949 175.906)"
          />
        </clipPath>
        <clipPath id="clip2_1175_19993">
          <rect
            width="25.2681"
            height="33.6644"
            fill="white"
            transform="translate(215.125 361.061)"
          />
        </clipPath>
        <clipPath id="clip3_1175_19993">
          <rect
            width="51.9375"
            height="50.4991"
            fill="white"
            transform="matrix(0.968336 0.249651 -0.250019 0.968241 394.93 540.532)"
          />
        </clipPath>
        <clipPath id="clip4_1175_19993">
          <rect
            width="61.7666"
            height="30.8591"
            fill="white"
            transform="translate(55.0938 609.336)"
          />
        </clipPath>
        <clipPath id="clip5_1175_19993">
          <rect
            width="33.6908"
            height="84.1611"
            fill="white"
            transform="translate(41.0586 157.671)"
          />
        </clipPath>
        <clipPath id="clip6_1175_19993">
          <rect
            width="154"
            height="81"
            fill="white"
            transform="translate(20 676)"
          />
        </clipPath>
        <clipPath id="clip7_1175_19993">
          <rect
            width="27"
            height="50"
            fill="white"
            transform="translate(139 659)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
