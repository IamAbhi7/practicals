
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
	ProductName	VARCHAR(30),
	Price		DECIMAL(18,2),
	Quantity	INT,
	UserId		INT FOREIGN KEY REFERENCES [USER](UserId)
)

INSERT	INTO Product
		(ProductName,Price,Quantity,UserId)
VALUES	('Bag',300,1,1),
		('Pen',50,1,3),
		('Milk',70,1,2),
		('Book',80,1,4),
		('Bottle',200,1,5),
		('Soap',50,1,1),
		('Chair',300,1,3),
		('Pillow',200,2,2),
		('Helmet',400,1,4),
		('Shoes',350,2,5)

SELECT * FROM Product


DROP FUNCTION IF EXISTS [dbo].[Result];
GO

CREATE FUNCTION [dbo].[Result]
( 
  @price DECIMAL(18, 2), 
  @quantity INT
)
RETURNS DECIMAL(18, 2)
AS
BEGIN
 RETURN(@price * @quantity)
END
GO


DROP PROCEDURE IF EXISTS [dbo].[FinalResult];
GO

CREATE PROCEDURE [dbo].[FinalResult]
@case INT = 0,
@discount DECIMAL(18, 2) = 0.1,
@userId INT
AS
BEGIN
 IF @case = 1
  SELECT [User].userId,
    [User].[Name],
    [User].Contact,
    [User].Age,
    Product.ProductName,
    Product.Price,
    Product.Quantity

  FROM [User]
    INNER JOIN Product
    ON [User].userId = Product.userId

 ELSE
  SELECT [User].userId,
    [User].[Name],
    [User].Contact,
    [User].Age,
    Product.ProductName,
    Product.Price,
    Product.Quantity,
    [dbo].[Result] (Product.Price, Product.Quantity) AS TotalPrice,
    [dbo].[Result] (Product.Price, Product.Quantity) * @discount AS DiscountedPrice,
    [dbo].[Result] (Product.Price, Product.Quantity) * (1 - @discount) AS OrderAmount

  FROM [User]
    INNER JOIN Product
    ON [User].userId = Product.userId
    WHERE [User].userId = IIF(@userId > 0, @userId, [User].userId)


END;

EXECUTE [dbo].[FinalResult] 2, 0.1, 2
