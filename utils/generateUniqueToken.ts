export default function generateUniqueToken() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2); // Remove '0.' prefix

    return `${timestamp}-${randomString}`;
}