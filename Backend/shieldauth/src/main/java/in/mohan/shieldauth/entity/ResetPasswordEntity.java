package in.mohan.shieldauth.entity;

import jakarta.validation.constraints.NotBlank;

public class ResetPasswordEntity {
	
	@NotBlank(message = "Email is Required")
	private String emailAddress;
	@NotBlank(message = "Password is Required")
	private String newPassword;
	@NotBlank(message = "OTP is Required")
	private String otp;
	
	public ResetPasswordEntity() {
		super();
	}

	public ResetPasswordEntity(@NotBlank(message = "Email is Required") String emailAddress,
			@NotBlank(message = "Password is Required") String newPassword,
			@NotBlank(message = "OTP is Required") String otp) {
		super();
		this.emailAddress = emailAddress;
		this.newPassword = newPassword;
		this.otp = otp;
	}

	@Override
	public String toString() {
		return "ResetPasswordEntity [emailAddress=" + emailAddress + ", newPassword=" + newPassword + ", otp=" + otp
				+ "]";
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
}
