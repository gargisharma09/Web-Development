export default function SiteList({sites}) {
    return (
        <ul> { sites.map((site,idx) => (
            <li key={site+idx} > {site} </li>
        ))}
    </ul>
    );
}