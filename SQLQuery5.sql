
DROP TABLE IF EXISTS [User]
DROP TABLE IF EXISTS Product
DROP TABLE IF EXISTS [Order]

--Create table User
CREATE TABLE [User]
(
	UserId	INT IDENTITY(1,1) PRIMARY KEY,
	[Name]	VARCHAR(50),
	Age		INT,
	Gender	VARCHAR(10),
	Contact	VARCHAR(20)
)

INSERT INTO [USER] 
			([Name],Age,Gender,Contact)
VALUES		('Abhishek Yadav',21,'male','8830547855'),
			('Mohit Patil',22,'male','9078775563'),
			('Madhuri Bapat',40,'female','77435578334'),
			('Satyam Patel',45,'male','9876543210'),
			('Mansi Sharma',30,'female','8756997800')

SELECT * FROM [User]

--Create table Product
CREATE TABLE Product
(
	ProductId	INT IDENTITY(1,1) PRIMARY KEY,
	ProcuctName	VARCHAR(30),
	Price		DECIMAL(18,2),
	Quantity	INT,
	UserId		INT FOREIGN KEY REFERENCES [USER](UserId)
)

INSERT	INTO Product
		(ProcuctName,Price,Quantity,UserId)
VALUES	('Bag',300,1,1),
		('Pen',50,1,3),
		('Milk',70,1,2),
		('Book',80,1,4),
		('Bottle',200,1,5),
		('Soap',50,1,1),
		('Chair',300,1,3)

SELECT * FROM Product

--Create table Order
--CREATE TABLE [Order]
--(
--	OrderId		INT IDENTITY(1,1) PRIMARY KEY,
--	UserId		INT FOREIGN KEY REFERENCES [User](UserId),
--	ProductId	INT FOREIGN KEY REFERENCES [Product](ProductId),
--	Quantity	INT
--)

--INSERT INTO [Order]
--			(UserId,ProductId,Quantity)
--VALUES		(1,1,2),
--			(1,2,1),
--			(2,2,2),
--			(2,3,1),
--			(3,3,2),
--			(4,4,1),
--			(5,5,2)

--Select * from [Order]


CREATE FUNCTION [DBO].[totalP] (	@quan	INT,	@userId	INT,	@totalPrice		DECIMAL(18, 2),)RETURNS DECIMAL(18, 2)ASBEGIN	RETURN (@totalPrice * @discountInPerc/100)END



DROP PROCEDURE IF EXISTS [DBO].[fetchData]
	
ALTER PROCEDURE [DBO].[fetchData]
@case INT = 0
--@totalPrice DECIMAL(18,2)
AS
BEGIN
	if @case=2
		BEGIN
			SELECT	use1.[Name],
					pro.ProcuctName,
					pro.Price,
					pro.Quantity
			FROM [User] use1
			INNER JOIN Product pro ON use1.UserId = pro.UserId
		END
	else
		BEGIN
			SELECT	use1.UserId,
					use1.[Name],
					use1.Gender,
					use1.Contact,
					pro.ProcuctName,
					pro.Price,
					pro.Quantity
			FROM [User] use1
			INNER JOIN Product pro ON use1.UserId = pro.UserId
			ORDER BY use1.UserId
		END
END

EXECUTE [fetchData] 2 

SELECT	PRO.ProcuctName,PRO.Price,USR.[Name]
FROM	Product PRO
INNER JOIN	[User] USR ON (USR.UserId = PRO.UserId)

SELECT	USR.[Name],PRO.ProcuctName,ORD.Quantity,PRO.PriceFROM	[User] USRLEFT JOIN	[Order] ORD  ON	(USR.UserId) = (ORD.UserId)LEFT JOIN	Product PRO	ON	(PRO.ProductId) = (ORD.OrderId)DROP FUNCTION [dbo].[FinalBill];
CREATE FUNCTION [dbo].[FinalBill]
( @Price DECIMAL(18, 2), 
 @Quantity INT)

RETURNS DECIMAL(18, 2)
AS
BEGIN
 RETURN(@Price * @Quantity)
END





DROP PROCEDURE [dbo].[GetOrderDetails];
CREATE PROCEDURE [dbo].[GetOrderDetails]
@Case INT = 0,
@Discount DECIMAL(18, 2) = 0.1,
@UserId INT
AS
BEGIN
 IF @Case = 1
  SELECT Users.UserId,
    Users.UserName,
    Users.UserContact,
    Users.UserAddress,
    Users.UserEmail,
    Users.UserAge,
    Products.ProductName,
    Products.Price,
    Products.Quantity

  FROM Users
    INNER JOIN Products
    ON Users.UserId = Products.UserId

 ELSE
  SELECT Users.UserId,
    Users.UserName,
    Users.UserContact,
    Users.UserAddress,
    Users.UserEmail,
    Users.UserAge,
    Products.ProductName,
    Products.Price,
    Products.Quantity,
    [dbo].[FinalBill] (Products.Price, Products.Quantity) AS TotalPrice,
    [dbo].[FinalBill] (Products.Price, Products.Quantity) * @Discount AS DiscountedPrice,
    [dbo].[FinalBill] (Products.Price, Products.Quantity) * (1 - @Discount) AS OrderAmount

  FROM Users
    INNER JOIN Products
    ON Users.UserId = Products.UserId
    WHERE Users.UserId = IIF(@UserId > 0, @UserId, Users.UserId)


END;

EXEC [dbo].[GetOrderDetails] 2, 0.1, 2