import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should hash the password correctly', async () => {
    const password = 'mySecretPassword';
    const hashedPassword = await passwordService.hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it('should produce different hashes for different passwords', async () => {
    const password1 = 'password1';
    const password2 = 'password2';
    const hashedPassword1 = await passwordService.hashPassword(password1);
    const hashedPassword2 = await passwordService.hashPassword(password2);

    expect(hashedPassword1).not.toBe(hashedPassword2);
  });

  it('should verify the password correctly', async () => {
    const password = 'mySecretPassword';
    const hashedPassword = await passwordService.hashPassword(password);
    const isValid = await passwordService.verifyPassword(
      hashedPassword,
      password,
    );

    expect(isValid).toBe(true);
  });

  it('should return false for incorrect password verification', async () => {
    const password = 'mySecretPassword';
    const hashedPassword = await passwordService.hashPassword(password);
    const isValid = await passwordService.verifyPassword(
      hashedPassword,
      'wrongPassword',
    );

    expect(isValid).toBe(false);
  });
});
