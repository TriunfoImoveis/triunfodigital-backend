export default interface IResponseSellersDashboardDTO {
    quantity: {
        sales: number,
        captivators: number,
    },
    ticket_medium: {
        sales: number,
        captivators: number,
    },
    comission: number,
    vgv: {
        sales: {
            total: number,
            months: {
                month: string,
                vgv: number
            }[],
        },
        captivators: {
            total: number,
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