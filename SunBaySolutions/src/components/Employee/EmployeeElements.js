import styled from "styled-components";
import { Link } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

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
  margin: 20px;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  grid-gap: 20px;
  padding: 0 50px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
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

export const EmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2c2c2c;
`;

export const EmployeeWrapper = styled.div`
  max-width: 1000px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

export const EmployeeCard = styled.div`
  background: #3d3d3d;
  display: flex;
  background-size:cover;
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

export const EmployeeIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const EmployeeH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: left;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#4F7CAC" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#ffffff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#ffffff" : "#01BF71")};
  }
`;

export const EmployeeH2 = styled.h2`
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  margin-bottom: 10px;
  text-shadow: 0 0 3px white;
`;
export const EmployeeH3 = styled.h3`
  font-size: 2rem;
  color: white;
  margin-bottom: 10px;
  margin-left: 10px;
  display: grid;
  justify-content: center;
  align-items: left;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const EmployeeP = styled.p`
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  text-shadow: 0 0 2px white;
  text-align: center;
  margin: 3px;
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
  background: #3d3d3d;
  max-width: 500px;
  width: 100%;
  z-index: 1;
  margin-top: 150px;
  padding: 50px 250px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;
export const EditAccountBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #c20114;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  right: 100;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #14cca4;
  }
`;

export const FormButton = styled.a`
  text-align: center;
  background: #c20114;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #c20114;
  }
`;

export const IncDecButton = styled.button`
  cursor: pointer;
  display: flex;
  height 100%;
  background-color: transparent;
  border: 0;
  font-size; 3rem;
  padding 0;
  height 40px;
`;

export const Value = styled.div`
  margin: 3px 8px;
  padding: 4px 8px;
  main-width: 2rem;
  text-allign: center:
  font-size: 1.5rem;
  line-height: 1rem;
  height: 24px;
  display: flex;
  justrify-content: center;
  allign-items: center
`;
