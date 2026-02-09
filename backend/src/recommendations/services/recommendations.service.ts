

export const getRecommendations = async ({ owner }: { owner: string }) => {
    try {
        return []
    } catch (err) {
        console.error(err);
        throw err;
    }
};
