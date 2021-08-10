import { fetchJson } from "../../util";
import withSession from "../../util/session";

export default withSession(async (req, res) => {
    const {username, password} = await req.body;

    try {
        let user = await fetchJson(process.env.NEXT_PUBLIC_ENV_VARIABLE + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        req.session.set("user", user);
        await req.session.save();
        res.json(user);
    } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
    }
});
