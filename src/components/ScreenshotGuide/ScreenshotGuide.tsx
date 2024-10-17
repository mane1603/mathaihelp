import './ScreenshotGuide.css'

const ScreenshotGuide: React.FC = () => {
    return (
        <div className='screenshot-guide'>
        Use
        {/* Arrow Up */}
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1002 3.06995C9.75256 2.78023 9.24755 2.78023 8.89988 3.06995L4.80221 6.48468C4.6334 6.62535 4.73288 6.9001 4.95261 6.9001C5.70369 6.9001 6.31255 7.50896 6.31255 8.26004V14.2126C6.31255 14.7304 6.73228 15.1501 7.25005 15.1501H11.7501C12.2678 15.1501 12.6876 14.7304 12.6876 14.2126V8.26004C12.6876 7.50896 13.2964 6.9001 14.0475 6.9001C14.2672 6.9001 14.3667 6.62535 14.1979 6.48468L10.1002 3.06995ZM8.17967 2.2057C8.94454 1.56831 10.0556 1.56831 10.8204 2.20571L14.9181 5.62043C15.8952 6.43471 15.3194 8.0251 14.0475 8.0251C13.9177 8.0251 13.8126 8.13028 13.8126 8.26004V14.2126C13.8126 15.3517 12.8891 16.2751 11.7501 16.2751H7.25005C6.11096 16.2751 5.18755 15.3517 5.18755 14.2126V8.26004C5.18755 8.13028 5.08237 8.0251 4.95261 8.0251C3.68066 8.0251 3.10487 6.4347 4.082 5.62043L8.17967 2.2057Z" fill="#B300F4"/>
        </svg>

        {/* Comand Key */}
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.375 2.4375C6.72119 2.4375 7.8125 3.52881 7.8125 4.875V6.1875H11.1875V4.875C11.1875 3.52881 12.2788 2.4375 13.625 2.4375C14.9712 2.4375 16.0625 3.52881 16.0625 4.875C16.0625 6.22119 14.9712 7.3125 13.625 7.3125H12.3125V10.6875H13.625C14.9712 10.6875 16.0625 11.7788 16.0625 13.125C16.0625 14.4712 14.9712 15.5625 13.625 15.5625C12.2788 15.5625 11.1875 14.4712 11.1875 13.125V11.8125H7.8125V13.125C7.8125 14.4712 6.72119 15.5625 5.375 15.5625C4.02881 15.5625 2.9375 14.4712 2.9375 13.125C2.9375 11.7788 4.02881 10.6875 5.375 10.6875H6.6875V7.3125H5.375C4.02881 7.3125 2.9375 6.22119 2.9375 4.875C2.9375 3.52881 4.02881 2.4375 5.375 2.4375ZM4.0625 4.875C4.0625 4.15013 4.65013 3.5625 5.375 3.5625C6.09987 3.5625 6.6875 4.15013 6.6875 4.875V6.1875H5.375C4.65013 6.1875 4.0625 5.59987 4.0625 4.875ZM14.9375 4.875C14.9375 5.59987 14.3499 6.1875 13.625 6.1875H12.3125V4.875C12.3125 4.15013 12.9001 3.5625 13.625 3.5625C14.3499 3.5625 14.9375 4.15013 14.9375 4.875ZM13.625 14.4375C12.9001 14.4375 12.3125 13.8499 12.3125 13.125V11.8125H13.625C14.3499 11.8125 14.9375 12.4001 14.9375 13.125C14.9375 13.8499 14.3499 14.4375 13.625 14.4375ZM4.0625 13.125C4.0625 12.4001 4.65013 11.8125 5.375 11.8125H6.6875V13.125C6.6875 13.8499 6.09987 14.4375 5.375 14.4375C4.65013 14.4375 4.0625 13.8499 4.0625 13.125ZM7.8125 10.6875V7.3125H11.1875V10.6875H7.8125Z" fill="#B300F4"/>
        </svg>
        

        {/* S key */}
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.27001 15.2588C7.40176 15.2588 6.61976 15.115 5.92401 14.8275C5.23401 14.5343 4.66188 14.1203 4.20763 13.5855C3.75913 13.0508 3.46588 12.4154 3.32788 11.6794L4.62163 11.4638C4.82863 12.2688 5.26563 12.9013 5.93263 13.3613C6.59963 13.8155 7.39601 14.0426 8.32176 14.0426C8.93126 14.0426 9.47751 13.9478 9.96051 13.758C10.4435 13.5625 10.823 13.2865 11.099 12.93C11.375 12.5735 11.513 12.1509 11.513 11.6621C11.513 11.3401 11.4555 11.067 11.3405 10.8428C11.2255 10.6128 11.0731 10.423 10.8834 10.2735C10.6936 10.124 10.4866 10.0004 10.2624 9.90264C10.0381 9.79914 9.81963 9.71576 9.60688 9.65251L6.45876 8.71239C6.07926 8.60314 5.72851 8.46514 5.40651 8.29839C5.08451 8.12589 4.80276 7.92176 4.56126 7.68601C4.32551 7.44451 4.14151 7.16276 4.00926 6.84076C3.87701 6.51876 3.81088 6.15076 3.81088 5.73676C3.81088 5.03526 3.99488 4.42864 4.36288 3.91689C4.73088 3.40514 5.23401 3.01126 5.87226 2.73526C6.51051 2.45926 7.23788 2.32414 8.05438 2.32989C8.88238 2.32989 9.62126 2.47651 10.271 2.76976C10.9265 3.06301 11.467 3.48276 11.8925 4.02901C12.318 4.56951 12.5998 5.21064 12.7378 5.95239L11.4095 6.19389C11.3233 5.65339 11.1249 5.18476 10.8144 4.78801C10.5039 4.39126 10.1071 4.08651 9.62413 3.87376C9.14688 3.65526 8.62076 3.54314 8.04576 3.53739C7.48801 3.53739 6.99063 3.63226 6.55363 3.82201C6.12238 4.00601 5.78026 4.25901 5.52726 4.58101C5.27426 4.90301 5.14776 5.27101 5.14776 5.68501C5.14776 6.10476 5.26276 6.44114 5.49276 6.69414C5.72851 6.94714 6.01601 7.14551 6.35526 7.28926C6.70026 7.43301 7.03376 7.55089 7.35576 7.64289L9.78801 8.35876C10.041 8.42776 10.3371 8.52839 10.6764 8.66064C11.0214 8.78714 11.3549 8.97114 11.6769 9.21264C12.0046 9.44839 12.2749 9.75889 12.4876 10.1441C12.7004 10.5294 12.8068 11.0181 12.8068 11.6104C12.8068 12.1854 12.6918 12.7 12.4618 13.1543C12.2375 13.6085 11.9184 13.9909 11.5044 14.3014C11.0961 14.6119 10.616 14.8476 10.064 15.0086C9.51776 15.1754 8.91976 15.2588 8.27001 15.2588Z" fill="#B300F4"/>
        </svg>
        to take screenshots faster
      </div>
    )
}

export default ScreenshotGuide;