type CompaniesId = "p10" | "deonibus";

const domains: Record<string, CompaniesId> = {
    "myota10.vercel.app": "p10",
    "myotabr.vercel.app": "deonibus",
    "localhost:3000": "deonibus",
}

type CompanySettings = {
    displayName: string;
    theme: string;
}

const companies: Record<CompaniesId, CompanySettings> = {
    p10: {
        displayName: "Plataforma 10",
        theme: "p10",
    },
    deonibus: {
        displayName: "DeÔnibus",
        theme: "deonibus",
    }
}

export function getCompanyIdByDomain(domain: string): CompaniesId {
    return domains[domain] ?? 'p10'
}

export function getCompanySettings(companyId: CompaniesId): CompanySettings {
    return companies[companyId]
}   