import React, { useState, useRef, useEffect } from 'react';

const RewardSelect = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');

    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSizeSelect = (size) => {
        if (!selectedSizes.includes(size)) {
            setSelectedSizes([...selectedSizes, size]);
        }
        setSelectedSize(size);
        setShowModal(false);
    };

    const handleSizeRemove = (sizeToRemove) => {
        const updatedSizes = selectedSizes.filter((size) => size !== sizeToRemove);
        setSelectedSizes(updatedSizes);
    };

    return (
        <div>
            <h1>리워드 페이지</h1>
            <button onClick={() => setShowModal(true)} className="reward-button">
                <span className="size-text">리워드 선택</span> <span className="arrow">&#9660;</span>
            </button>
            {showModal && (
                <div className="modal" ref={modalRef} style={{ width: '300px' }}>
                    <div className="modal-content">
                        <h2>리워드를 선택해주세요.</h2>
                        <ul className="no-bullets">
                            {sizes.map((size) => (
                                <li key={size}>
                                    <button onClick={() => handleSizeSelect(size)} className='selectButton'>{size}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {selectedSizes.length > 0 && (
                <div>
                    <h2 className="selected-size-header">선택한 리워드:</h2>
                    <ul className="no-bullets">
                        {selectedSizes.map((size, index) => (
                            <li key={index}>
                                <span className="size-text">{size}</span>{' '}
                                <button className="remove-button" onClick={() => handleSizeRemove(size)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RewardSelect;
