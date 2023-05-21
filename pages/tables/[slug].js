import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrimaryLayout from '../../Components/Layout/PrimaryLayout';

const TableDetailsPage = () => {
    const router = useRouter();
    const [tableDetails, setTableDetails] = useState([]);
    let slug = router.query.slug;


    console.log("slug", slug)
    useEffect(() => {
        const tableName = router.query.slug; // Replace with your actual table name
        if (tableName?.length > 0) {
            fetch(`/api/tableDetails?tableName=${tableName}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.tableDetails) {
                        setTableDetails(data.tableDetails);
                    }
                })
                .catch((error) => {
                    console.error('Error retrieving table details:', error);
                });
        }

    }, [router.query.slug]);

    return (
        <PrimaryLayout>
            <div>
                <h1>Table Details</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Null</th>
                            <th>Key</th>
                            <th>Extra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableDetails.map((field) => (
                            <tr key={field.Field}>
                                <td>{field.Field}</td>
                                <td>{field.Type}</td>
                                <td>{field.Null}</td>
                                <td>{field.Key}</td>
                                <td>{field.Extra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3><Link href="/tables"> SEE TABLE LIST  </Link>  </h3>
            </div>
        </PrimaryLayout>

    );
};

export default TableDetailsPage;
