import styled from "styled-components";

export const AccountSettingCard = styled.div`
  background: #2c2c2c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;
export const AccountSettingWrapper = styled.div`
  max-width: 1000px;
  margin: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 200px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
export const AccountSettingH2 = styled.h2`
  font-size: 1.5rem;
  color: #6d7275;
  margin-bottom: 10px;
`;
export const AccountP = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
`;

export const FormButton = styled.a`
  text-align: center;
  background: #14cca4;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #14cca4;
  }
`;

export const AdminContainer = styled.div`
  align-items: center;
  background: #2c2c2c;
`;

export const AdminWrapper = styled.div`
  margin: 20px auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const AdminWrapperDeux = styled.div`
  max-width: 1000px;
  margin: auto;
  align-items: center;
  padding: 30px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const InventoryWrapper = styled.div`
  max-width: 1000px;
  margin: 100px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const CheckoutCard = styled.div`
  background: #5c5c5c;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  margin: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`

export const AdminCard = styled.div`
  background: #5c5c5c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const AdminIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const AdminH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-top: 100px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: left;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const AdminH1_5 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: left;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const AdminH1_75 = styled.h1`
  font-size: 1.25rem;
  color: #fff;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: left;

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const AdminH2 = styled.h2`
  font-size: 1rem;
  color: white;
  margin-bottom: 10px;
`;
export const AdminH3 = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 10px;
  margin-left: -25px;
  display: flex;
  justify-content: center;
  align-items: left;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const AdminP = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
`;
export const FormWrap = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;
export const Form = styled.form`
  background: #5c5c5c;
  max-width: 500px;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  margin-top: 150px;
  padding: 50px 250px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormLittle = styled.form`
  background: #14cca4;
  max-width: 500px;
  width: 50%;
  z-index: 2;
  display: grid;
  margin-top: -30px;
  margin-left: -190px;
  padding: 20px 50px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;
