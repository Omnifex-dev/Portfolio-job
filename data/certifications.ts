export type Certification = {
  title: string;
  kind: "role" | "skill";
  issuer: string;
  /** HackerRank certificate id, the last segment of the certificate URL. */
  id: string;
  /**
   * Optional certificate image in /public, e.g. "/certificates/frontend.png".
   * Download it from HackerRank (Certificate page → Download) to show it here.
   */
  image?: string;
};

export const certifications: Certification[] = [
  { title: "Frontend Developer", kind: "role", issuer: "HackerRank", id: "7d0aa99af967" },
  { title: "Software Engineer", kind: "role", issuer: "HackerRank", id: "4bb12a355bb8" },
  { title: "Python", kind: "skill", issuer: "HackerRank", id: "297dc1f55ec2" },
  { title: "Node.js", kind: "skill", issuer: "HackerRank", id: "c6ce237179b1" },
  { title: "Angular (Basic)", kind: "skill", issuer: "HackerRank", id: "bb4e5109bbb0" },
];

export const certificateUrl = (id: string) => `https://www.hackerrank.com/certificates/${id}`;
