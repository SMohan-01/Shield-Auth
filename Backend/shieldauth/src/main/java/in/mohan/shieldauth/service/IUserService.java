package in.mohan.shieldauth.service;

import in.mohan.shieldauth.entity.UserEntity;
import in.mohan.shieldauth.exception.UserProfileAlreadyExistException;
import in.mohan.shieldauth.exception.UserProfileNotExistException;

public interface IUserService {

	public UserEntity createProfile(UserEntity user) throws UserProfileAlreadyExistException;

	public UserEntity getProfile(String emailAddress) throws UserProfileNotExistException;

	public void sendResetOtp(String emailAddress) throws UserProfileNotExistException;
	
	public void resetPassword(String emailAddress, String newPassword, String otp) throws UserProfileNotExistException;
	
	public void sendOtp(String emailAddress) throws UserProfileNotExistException;
	
	public void verifyOtp(String emailAddress, String otp) throws UserProfileNotExistException;
	
	public String getLoggedInUserId(String emailAddress) throws UserProfileNotExistException;

}
