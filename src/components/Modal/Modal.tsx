import React, { FC } from 'react'
import styled from 'styled-components';

interface ModalProps {
    open: boolean;
    closeModal: () => void
}

const Modal: FC<ModalProps> = ({ open, closeModal, children }) => {
    return (
        <ModalBackground visible={open}>
            <ModalContentContainer>
                <ModalHeader>
                    <Title>
                        Title
                    </Title>
                    <CloseContainer onClick={closeModal}>
                        X
                    </CloseContainer>
                </ModalHeader>
                {children}
            </ModalContentContainer>
        </ModalBackground>
    )
}

const ModalBackground = styled.div<{ visible: boolean }>`
    display: ${(props) => props.visible ? 'flex' : 'none'};
    position: absolute;
    background-color: #cecece;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
`;

const ModalContentContainer = styled.div`
    width: 60%;
    height: 60%;
    background-color: #fff;
    border-radius: 10px;
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1.5px solid #eeeeee;
    display: flex;
`;

const Title = styled.span`
    font-size: 24px;
    flex: 1;
    margin: auto;
    padding: 10px 20px;
`;

const CloseContainer = styled.div`
    margin: auto;
    font-size: 24px;
    padding: 10px 20px;
    cursor: pointer;
`

export default Modal;
