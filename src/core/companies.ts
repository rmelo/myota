import { domains } from "./domains";

export type CompaniesId = "p10" | "deonibus" | "12go" | "bookaway";

type CompanySettings = {
    displayName: string;
    theme: string;
    defaultLanguage: string;
}

const companies: Record<CompaniesId, CompanySettings> = {
    p10: {
        displayName: "Plataforma 10",
        theme: "p10",
        defaultLanguage: "es",
    },
    deonibus: {
        displayName: "DeÔnibus",
        theme: "deonibus",
        defaultLanguage: "pt",
    },
    '12go': {
        displayName: "12go",
        theme: "12go",
        defaultLanguage: "en",
    },
    bookaway: {
        displayName: "Bookaway",
        theme: "bookaway",
        defaultLanguage: "en",
    },
}

export function getCompanyIdByDomain(domain: string): CompaniesId {
    return domains[domain] ?? 'p10'
}

export function getCompanySettings(companyId: CompaniesId): CompanySettings {
    return companies[companyId]
}   