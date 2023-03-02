import styled from "styled-components";

const StyledImage = styled.img`
  border-radius: 15%;
  margin-bottom: 16px;
`;

const About = () => {
  const aboutText = `
    We are a team of experienced dental professionals dedicated to providing the highest quality dental care to our patients. Our clinic 
    is equipped with state-of-the-art technology and equipment to ensure that you receive the most advanced and effective treatment available.

    Our mission is to help our patients achieve optimal oral health and beautiful smiles that they can be proud of. We understand that 
    visiting the dentist can be a stressful experience for many people, which is why we prioritize patient comfort and care. From the 
    moment you walk through our doors, our friendly and knowledgeable staff will make you feel welcome and at ease.

    Our dental services cover a wide range of treatments, including preventative care, restorative dentistry, cosmetic dentistry, and more. 
    Whether you need a routine cleaning or a complex procedure, we have the skills and expertise to provide you with the best possible care.

    We believe that education is key to maintaining good oral health, which is why we take the time to educate our patients on proper dental 
    hygiene and preventative care techniques. We are committed to helping our patients achieve long-term oral health and we will work with you 
    to develop a customized treatment plan that meets your unique needs.

    At our dental clinic, we are passionate about helping our patients achieve beautiful, healthy smiles. If you are looking for a trusted 
    dental provider, we invite you to schedule an appointment with us today. We look forward to meeting you and helping you achieve your oral 
    health goals.
    `;

  return (
    <div className="container text-center">
      <h1 className="mt-3">Welcome to our dental clinic!</h1>

      <section>
        <p style={{ display: "block", whiteSpace: "pre-wrap" }}>{aboutText}</p>
        <StyledImage
          src="https://www.milesight.com/structure/image/press/case-study/primadent-dental-clinic/cover.png"
          alt="building"
        />
      </section>
    </div>
  );
};

export default About;
