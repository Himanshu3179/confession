
import React from 'react'
import SpecificConfessions from './SpecificConfessions'
import SelectTypeOfConfession from './SelectTypeOfConfession'

const YourConfessions = () => {

    return (
        <div className='bg-secondary w-full rounded-lg p-5'>

            <SelectTypeOfConfession />
            <SpecificConfessions />

        </div>
    )
}

export default YourConfessions

