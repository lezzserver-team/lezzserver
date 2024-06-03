import { useContext } from 'react';
import { DataPageContext } from '../context/data-page-context';

export const useDataPage = () => {
    const context = useContext(DataPageContext);
    if (!context) {
        throw new Error('useDataPage must be used within a DataPageProvider');
    }
    return context;
};

