import React from 'react';

const userContext = React.createContext({
    teacherId: '',
    setTeacherId: (id) => { },
});

export default userContext;