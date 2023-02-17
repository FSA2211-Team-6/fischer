import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";

type TeamMember = {
  name: string;
  picture: string;
  linkedin: string;
  github: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Edmund He",
    picture: "https://ca.slack-edge.com/T024FPYBQ-U044LRSBS3F-8b230715abb7-512",
    linkedin: "https://www.linkedin.com/in/eddiefahrenheit",
    github: "https://github.com/EddieFahrenheit",
  },
  {
    name: "Winter Hardcastle",
    picture: "https://ca.slack-edge.com/T024FPYBQ-U0450ES8GU9-3b0e5a3c793c-512",
    linkedin: "https://www.linkedin.com/in/winter-hardcastle",
    github: "https://github.com/winterhardcastle",
  },
  {
    name: "Sam Ting",
    picture: "https://ca.slack-edge.com/T024FPYBQ-U0450ESLSGH-a642850c17f2-512",
    linkedin: "https://www.linkedin.com/in/samnting",
    github: "https://github.com/SNLTING",
  },
  {
    name: "Derek McEnroe",
    picture: "https://ca.slack-edge.com/T024FPYBQ-U0450ESD6Q1-57f7ef4db1a9-512",
    linkedin: "https://www.linkedin.com/in/derekmcenroe",
    github: "https://github.com/dmcenroe",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="mx-14 bg-gray-700 ">
      <div className="py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold  text-gray-200">Our Team</h2>
          <p className="mt-2 text-lg text-gray-400">
            {/* summary/mission can go in here*/}
          </p>
        </div>
        <div className="mt-10 flex justify-center space-x-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <Image
                className=" rounded-full object-cover"
                src={member.picture}
                alt={`${member.name}'s profile picture`}
                width={150}
                height={150}
              />
              <div className="mt-2 text-center flex flex-col">
                <span className="text-lg font-medium text-gray-300">
                  {member.name}
                </span>
                <div className="flex flex-row justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-300 px-2"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 px-2"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
