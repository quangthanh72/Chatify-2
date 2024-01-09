import { Test, TestingModule } from '@nestjs/testing';
import { BoxChatController } from './box-chat.controller';
import { BoxChatService } from './box-chat.service';

describe('BoxChatController', () => {
  let boxChatController: BoxChatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BoxChatController],
      providers: [BoxChatService],
    }).compile();

    boxChatController = app.get<BoxChatController>(BoxChatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(boxChatController.getHello()).toBe('Hello World!');
    });
  });
});
