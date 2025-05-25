import React from 'react';
import MemberVerified from '../../Components/MemberRegistration/MemberVerified';

const Girl = () => {
      const { loading } = useAuth();

    if (loading) return <Loading />;
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className='mt-12 mb-5 px-8'>
              <MemberVerified />
            </div>

        </div>
    );
};

export default Girl;