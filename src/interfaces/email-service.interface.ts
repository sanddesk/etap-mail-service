import { SendRawEmailDto } from 'src/dtos/send-mail.dto';
// import { SendTemplatedEmailPayload } from './send-templated-email-payload.interface';
// import { WeeklyStatusPayload } from './weekly-status-email.interface';

// import { Products } from 'src/products/entities/products.entity';
// import { ClaimIncident } from 'src/users/claims/incidents/entities/claim-incident.entity';
// import { PremiumInformation } from 'src/users/premium-information/entities/premium-information.entity';
// import { User } from 'src/users/users/users.entity';
// import { Wallet } from 'src/payments/entities/wallet.entity';
export type MailSource = 'ETAP' | 'Balloon';
export type SignUpArgs = {
  subject: string;
  src: string;
  source: string;
};

export type MailContentTypes = 'text/plain' | 'application/pdf' | 'image/gif';

export interface MailAttachment {
  encoding: 'base64';
  filename: string; // test.pdf
  content: string; // base64 value
  contentType: MailContentTypes;
}

export interface EmailService {
  sendMail: (payload: SendRawEmailDto) => Promise<void>;
  // sendTemplatedMail: (payload: SendTemplatedEmailPayload) => Promise<void>;
  // sendSignupMail: (user: User, args?: SignUpArgs) => Promise<void>;
  // sendResetPasswordMail: (user: User) => Promise<void>;
  // sendClaimSettlementMail: (incident: ClaimIncident) => Promise<void>;
  // sendClaimSettlementAdminMail: (
  //   incident: ClaimIncident,
  //   adminEmails: string[],
  // ) => Promise<void>;
  // sendClaimSettlementCompleteMail: (incident: ClaimIncident) => Promise<void>;
  // sendClaimServiceCenterMail: (incident: ClaimIncident) => Promise<void>;
  // sendPolicyCertificateMail: (
  //   policy: PremiumInformation,
  //   isRenewal?: boolean,
  // ) => Promise<void>;
  // sendPolicyRenewalCertificateMail: (
  //   policy: PremiumInformation,
  // ) => Promise<void>;
  // sendPolicyPerformanceMail: (
  //   policy: PremiumInformation,
  //   sourcePolicy: PremiumInformation,
  //   totalDistance: number,
  //   totalTrips: number,
  //   leaderboard: any,
  //   scoreCard: string,
  //   subject: string,
  // ) => Promise<void>;
  // sendWelcomeMail: (user?: User) => Promise<void>;
  // sendWelcomeAdminMail: (user: User, defaultPassword: string) => Promise<void>;
  // sendPointRedemptionMail: (user: User, product: Products) => Promise<void>;
  // sendCancelledPolicyMail: (policy: PremiumInformation) => Promise<void>;
  // sendFailedPolicyMail: (policy: PremiumInformation, message) => Promise<void>;
  // sendClaimEmail: (
  //   claim: ClaimIncident,
  //   recipients: string[],
  //   options?: { showServiceCenter?: boolean; showPriceEstimate?: boolean },
  //   subject?: string,
  // ) => Promise<void>;
  // sendPolicyFutureRenewalMail: (
  //   policy: PremiumInformation,
  //   message,
  // ) => Promise<void>;
  // sendWeeklyStatusMail: (
  //   payload: WeeklyStatusPayload,
  //   email: string,
  // ) => Promise<void>;
  // sendUpdateReminderMail?: (user: User) => Promise<void>;
  // sendMTNMail?: (user: User) => Promise<void>;
  // sendPolicyReminderMail?: (policy: PremiumInformation) => Promise<void>;
  // sendInactiveUserMail?: (user: User) => Promise<void>;
  // sendLocationSettingsMail?: (user: User) => Promise<void>;
  // sendPolicyPurchaseRemindersMail?: (user: User) => Promise<void>;
  // sendLeaderboardFirstMail?: (user: Partial<User>) => Promise<void>;
  // sendLeaderboardSecondMail?: (user: Partial<User>) => Promise<void>;
  // sendLeaderboardThirdMail?: (user: Partial<User>) => Promise<void>;
  // sendImageVerificationFailMail?: (
  //   policy: PremiumInformation,
  //   notes?: string[],
  // ) => Promise<void>;
  // sendSDPMail?: (user?: User) => Promise<void>;
  // sendLeaderboardWinnerMail?: (
  //   user?: User,
  //   url?: string,
  //   position?: string,
  //   points?: string,
  // ) => Promise<void>;
  // sendTestMail?: () => Promise<void>;
  // sendOnboardingMail?: (user?: User) => Promise<void>;
  // sendNewYearMail?: (user?: User) => Promise<void>;
  // sendNaicomUpdateMail?: (user?: User) => Promise<void>;
  // sendResetPinOTPMail?: (user?: User, wallet?: Wallet) => Promise<void>;
  // sendPolicyExpiryMail?: (policy: PremiumInformation) => Promise<void>;
}
