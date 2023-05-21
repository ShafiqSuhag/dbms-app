import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrimaryLayout from '../../Components/Layout/PrimaryLayout';

const TableDetailsPage = () => {
    const router = useRouter();
    const [tableDetails, setTableDetails] = useState([]);
    let slug = router.query.slug;

    const [tableLabel, setTableLabel] = useState('')
    useEffect(() => {
        setTableLabel(slug)
    }, [slug])


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

            <div className='px-1 py-5'>
                <h1 className="text-3xl font-bold text-blue-500">
                    Table Details of  <span className="text-gray-900"> {tableLabel}</span>
                </h1>

            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b font-medium uppercase text-left">Field</th>
                        <th className="py-2 px-4 border-b font-medium uppercase  text-left">Type</th>
                        <th className="py-2 px-4 border-b font-medium uppercase  text-left">Null</th>
                        <th className="py-2 px-4 border-b font-medium uppercase  text-left">Key</th>
                        <th className="py-2 px-4 border-b font-medium uppercase  text-left">Extra</th>


                    </tr>
                </thead>
                <tbody>
                    {tableDetails.map((field, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{field.Field}</td>
                            <td className="py-2 px-4 border-b">{field.Type}</td>
                            <td className="py-2 px-4 border-b">{field.Type}</td>
                            <td className="py-2 px-4 border-b">{field.Null}</td>
                            <td className="py-2 px-4 border-b">{field.Extra}</td>
                            {/* <td className="py-2 px-4 border-b hover:underline"><Link key={field} href={`tables/${field}`} >{field}</Link></td> */}
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className='px-1 py-5'>
                <h3 className='text-xl text-gray-700 font-semibold hover:text-blue-500  '><Link href="/tables"> SEE TABLE LIST  </Link>  </h3>
            </div>
        </PrimaryLayout>

    );
};

export default TableDetailsPage;
