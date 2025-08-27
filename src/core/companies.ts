type Company = {
    name: string;
    domain: string;
}

const companies = [
    {
        name: "p10",
        domain: "myota10.vercel.app",
    },
    {
        name: "deonibus",
        domain: "myotabr.vercel.app",
    },
]

export function getCompany(domain?: string, name?: string): Company {
    const company = name
        ? companies.find((company) => company.name === name)
        : companies.find((company) => company.domain === domain)
    return company ?? companies.find((company) => company.name === 'p10')!
}