type LogoImageProps = {
    url: string;
    width: string;
    height: string;
    rounded?: string | undefined;
}

const logos: Record<string, { logo: Record<"sm" | "lg", LogoImageProps> }> = {
    p10: {
        logo: {
            sm: { url: "/companies/p10/logo-sm.svg", width: '56px', height: '28px' },
            lg: { url: "/companies/p10/logo-lg.svg", width: '160px', height: '21px' },
        }
    },
    deonibus: {
        logo: {
            sm: { url: "/companies/deonibus/logo-sm.png", width: '40px', height: '40px', rounded: 'sm' },
            lg: { url: "/companies/deonibus/logo-lg.svg", width: '120px', height: '21px' },
        }
    },
    '12go': {
        logo: {
            sm: { url: "/companies/12go/logo-lg.svg", width: '117px', height: '33px' },
            lg: { url: "/companies/12go/logo-lg.svg", width: '117px', height: '33px' },
        }
    },
    bookaway: {
        logo: {
            sm: { url: "/companies/bookaway/logo-lg.svg", width: '146px', height: '24px' },
            lg: { url: "/companies/bookaway/logo-lg.svg", width: '146px', height: '24px' },
        }
    },
}

export function getLogoProps(company: string, size: "sm" | "lg"): LogoImageProps {
    return logos[company as keyof typeof logos].logo[size];
}

