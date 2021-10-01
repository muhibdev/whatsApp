import Paths from '../../Configration/Paths';
import { getAuthToken } from '../../Api';

const ProtectPage = ({ isProtected, children }) => {
	if (isProtected) {
		const haveToken = getAuthToken();
		if (!haveToken) window.location.replace(Paths.SignUp);
	}
	return children;
};

export default ProtectPage;
