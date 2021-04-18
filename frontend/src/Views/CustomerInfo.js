import { useQuery } from '@apollo/client';
import CardInfo from '../Components/CardInfo'
import { useSession } from '../contexts/SessionContext';
import { USER_QUERY } from '../graphql/userQuery';

const CustomerInfo = (props) => {
    const { userCookies } = useSession()
    const id = userCookies?._id ?? 0;
    const { loading, data, error } = useQuery(USER_QUERY, {
        variables: { id },
    });
    
    if (loading) {
        props?.showLoading(true)
    } else if (!loading || error){
        props?.showLoading(false)
    }

    return (
        <main>
            <CardInfo customerById={data?.customerById ?? {}} />
        </main>

    )
}
export default CustomerInfo;