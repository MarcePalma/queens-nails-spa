import React from 'react';
import ManicuraCard from './Card/ManicuraCard';
import PedicuraCard from './Card/PedicuraCard';
import { Post } from '@/types/types';


const Postscard: React.FC<Post> = (props) => {
    const { category, image, ...rest } = props;

    return (
        <div className="postscard">
            {category === 'manicura' && <ManicuraCard {...rest} image={image} />}
            {category === 'pedicura' && <PedicuraCard {...rest} image={image} />}
        </div>
    );
};

export default Postscard;