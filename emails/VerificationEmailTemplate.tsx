import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

const VerificationEmailTemplate = ({ username, otp }: EmailTemplateProps) => {
  return (
    <div className="bg-slate-50 font-sans m-0 py-5 w-full">
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
        className="bg-slate-50 font-sans m-0 py-5 w-full"
      >
        <tbody>
          <tr>
            <td align="center">
              <table
                width="580"
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
                className="bg-white mx-auto p-0 mb-16 w-[580px] max-w-full border border-gray-200 rounded-lg overflow-hidden"
              >
                <tbody>
                  {/* This row now has padding-top to create space */}
                  <tr>
                    <td className="px-[30px] pt-8">
                      <h1 className="text-2xl font-bold text-gray-800 my-[30px]">
                        Hi, {username}!
                      </h1>
                      <p className="text-base leading-[26px] text-gray-600 my-4">
                        Thanks for signing up. Please use the following one-time
                        password (OTP) to complete your verification.
                      </p>
                      <table
                        width="100%"
                        cellPadding="0"
                        cellSpacing="0"
                        role="presentation"
                      >
                        <tbody>
                          <tr>
                            <td align="center">
                              <div className="bg-slate-100 rounded-lg px-5 py-2.5 text-center my-6 inline-block">
                                <p className="text-[32px] font-bold text-[#1d3557] tracking-[2px] m-0">
                                  {otp}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p className="text-base leading-[26px] text-gray-600 my-4">
                        This code will expire in 10 minutes. If you did not
                        request this, please ignore this email.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-[30px]">
                      <div className="border-t border-solid border-gray-200 my-5"></div>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-[30px] pb-[30px] text-center">
                      <p className="text-xs text-gray-500 leading-normal mb-1">
                        © {new Date().getFullYear()} Your Company Inc. All
                        rights reserved.
                      </p>
                      <p className="text-xs text-gray-500 leading-normal mb-1">
                        123 Main Street, Anytown, USA 12345
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerificationEmailTemplate;
