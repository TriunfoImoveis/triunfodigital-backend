export default interface IResponseSellersDashboardDTO {
    ticket_medium: {
        sales: number,
        captivators: number,
    },
    comission: {
        total: number,
        months: {
            month: string,
            comission: number
        }[],
    },
    vgv: {
        sales: {
            total: number,
            quantity: number,
            months: {
                month: string,
                vgv: number
            }[],
        },
        captivators: {
            total: number,
            quantity: number,
            months: {
                month: string,
                vgv: number,
            }[],
        },
    },
    sales: {
        status: {
            nao_validado: number,
            caiu: number,
            pendente: number,
            pago_total: number,
        }
        types: {
            new: number,
            used: number,
        },
        origins: {
            origin: string,
            value: number,
        }[],
        properties: {
            property: string,
            quantity: number,
        }[],
        neighborhoods: {
            neighborhood: string,
            quantity: number,
        }[],
    },
    client: {
        genders: {
            gender: string,
            percentage: number,
        }[],
        civil_status: {
            status: string,
            percentage: number,
        }[],
        avg_number_children: number,
        age_groups: {
            age: string,
            percentage: number,
        }[],
    }
}