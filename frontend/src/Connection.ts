export class Connection {
    public static init() {
        const events = new EventSource('http://localhost:3000/login');
        events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log(parsedData);
        }
    }
}
