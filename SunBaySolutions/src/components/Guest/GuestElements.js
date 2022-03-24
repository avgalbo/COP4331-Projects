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

export const GuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2c2c2c;
  @media screen and (max-width: 768px) {
    height: 2700px;
  }
  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const GuestWrapper = styled.div`
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

export const GuestCard = styled.div`
  background: #3d3d3d;
  background-size: cover;
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

export const GuestIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const GuestPageHeader = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: left;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const GuestH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: left;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const GuestEmptyWarn = styled.p`
  font-size: 2.5rem;
  color: grey;
  font-size: 24px;
  padding: 20px;
  text-align: center;
  margin: 0 auto;
`;

export const RockerButtons = styled.a`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline;
  background: ${({ primary }) => (primary ? "#4F7CAC" : "#010606")};
  white-space: nowrap;
  font-weight: bold;
  padding: 5px 0;
  color: ${({ dark }) => (dark ? "#010606" : "#ffffff")};
  font-size: ${({ fontBig }) => (fontBig ? "30px" : "22px")};
  outline: none;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  width: 66px;
  text-align: center;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#ffffff" : "#01BF71")};
  }
`;

export const RockerMid = styled.p`
  width: 66px;
  text-align: center;
  display: inline;
  font-size: ${({ fontBig }) => (fontBig ? "30px" : "22px")};
  font-weight: bold;
  color: ${({ dark }) => (dark ? "#010606" : "#ffffff")};
  background: ${({ primary }) => (primary ? "#4F7CAC" : "#010606")};
  padding: 3px;
`

export const GuestH2 = styled.h2`
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  margin-bottom: 10px;
`;

export const GuestH3 = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: right;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const GuestP = styled.p`
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
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
  background: #3d3d3d;
  max-width: 400px;
  width: 95vw;
  z-index: 1;
  display: grid;
  grid-template-columns: 35% auto;
  grid-gap: 10px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
`;
export const FormLittle = styled.form`
  background: #14cca4;
  width: auto;
  max-height: 70px;
  z-index: 2;
  padding: 6px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  text-align: center;
  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const Button = styled.a`
  display: inline-block;
  margin: 8px;
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

export const IncDecButton = styled.a`
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
