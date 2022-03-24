import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    108deg,
    rgba(20, 204, 164, 1) 0%,
    rgba(8, 15, 15, 1) 90%
  );
`;

export const Button = styled.a`
    font-size: 32px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    color: white;
    padding: 20px;
`;

export const CapButton = styled.a`
  text-align: center;
  background: #14cca4;
  padding: 13px;
  border: none;
  border-radius: 0 4px 4px 0;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  width: 100px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #000;
    color: #14cca4;
  }
`

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
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
  background: #010101;
  max-width: 400px;
  margin: 100px auto;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
`;
export const FileInput = styled.input`
  height: 48px;
  border-radius: 4px;
  background: white;
  color: black;
  margin-bottom: 10px;
  &::file-selector-button {
      cursor: pointer;
      padding: 16px 16px;
      margin-bottom: 32px;
      border: none;
      border-radius: 4px 0 0 4px;
      background: #14cca4;
      color: white;
      transition: all 0.2s ease-in-out;
  }
  &::file-selector-button:hover {
    background: #fff;
    color: #14cca4;
  }
`;
export const CapInput = styled.input`
  padding: 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px 0 0 4px;
  transform: translateY(-3px);
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
export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;

export const AdminCard = styled.div`
  background: #5c5c5c;
  display: flex;
  background-size: cover;
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

export const AdminH2 = styled.h2`
  font-size: 1rem;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 10px;
  text-shadow: 0 0 3px white;
`;

export const AdminP = styled.p`
  font-size: 1rem;
  color: black;
  text-shadow: 0 0 2px white;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`;

export const FormButtonDelete = styled.button`
  background: red;
  padding: 4px 10px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #14cca4;
  }
`;
