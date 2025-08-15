import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  max-width: 720px;
  padding-right: 24px;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
`;

