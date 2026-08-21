const expires_at = 1786701600;
const data_access_expires_at = 1794429890;

const expDate = new Date(expires_at * 1000);
const dataExpDate = new Date(data_access_expires_at * 1000);
const nowDate = new Date();

console.log('Now:', nowDate.toISOString(), 'Local:', nowDate.toLocaleString());
console.log('Token Expires At:', expDate.toISOString(), 'Local:', expDate.toLocaleString());
console.log('Data Access Expires At:', dataExpDate.toISOString(), 'Local:', dataExpDate.toLocaleString());

const diffMs = expDate.getTime() - nowDate.getTime();
console.log('Diff in ms:', diffMs);
console.log('Diff in hours:', diffMs / (1000 * 3600));
console.log('Diff in days:', diffMs / (1000 * 3600 * 24));
