import axios from "axios";

const GEOPIFY_API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;

export const getAdress = async (input: string) => {
    try {
        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/autocomplete",
            {
                params: {
                    text: input,
                    apiKey: GEOPIFY_API_KEY,
                },
            }
        );
        console.log(response.data.features);
        return (
            response.data.features.map((feature) => feature.properties) || []
        );
    } catch (error) {
        console.error("Error fetching address suggestions:", error);
        return [];
    }
};
