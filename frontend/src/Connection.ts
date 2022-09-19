export class Connection {
    public static init(jwt: string) {
        const events = new EventSource(`http://localhost:3000/login?jwt=${jwt}`);
        events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log(parsedData);
        }
    }
}
