import axios from "axios"
import qs from "qs"

class MagentoService {

    constructor() {
        this.axiosIntance = axios.create({
            baseURL: "http://localhost",
            headers: {
                authorization: `bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
            },

        })
    }

    async getCategories() {
        try {
            const searchCriteria = qs.stringify({
                searchCriteria: {
                    filterGroups: [{
                        filters: [
                            {
                                "conditionType": "equal",
                                "field": "level",
                                "value": "2"
                            },
                        ],
                    }]
                }
            }, { encode: false });
            const res = await this.axiosIntance.get("rest/default/V1/categories/list" + "?" + searchCriteria,)
            console.log(res)
            return res.data
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default new MagentoService