import React from 'react';
import ManicuraCard from './Card/ManicuraCard';
import PedicuraCard from './Card/PedicuraCard';
import { Post } from '@/types/types';

interface PostscardProps extends Post {
    category: string;
    image: string;
}

const Postscard: React.FC<PostscardProps> = (props) => {
    const { category, image, ...rest } = props;

    return (
        <div className="postscard">
            {category === 'manicura' && <ManicuraCard {...rest} image={image} />}
            {category === 'pedicura' && <PedicuraCard {...rest} image={image} />}
        </div>
    );
};

export default Postscard;