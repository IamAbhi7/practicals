CREATE FUNCTION [dbo].[MyFunc]
( 
 @price DECIMAL (18, 2),
 @quantity INT
 --@discount DECIMAL (18,2)
)
RETURNS DECIMAL(18,2)  
AS   
BEGIN  
    RETURN @quantity * @price 
 --(1 - @discount)  
END 


--CREATE PROCEDURE
ALTER PROCEDURE [dbo].[calculation] 
 @case   INT = 1,
 @amountdeduct DECIMAL (18,2) = 0.1,
 @UserId   VARCHAR(50) = ''

AS 
BEGIN

 --check whether case is to fetch data of Users with Products.
 IF (@case = 1)
  SELECT USR.Username,
    USR.UserCity,
    USR.UserContact,
    USR.UserEmail,
    PRD.ProductName,
    PRD.ProductPrice,
    PRD.ProductQuantity,
    PRD.ProductCategory
  FROM usertable USR
    INNER JOIN Product PRD ON PRD.UserId = USR.UserId
  WHERE USR.UserId = IIF (@UserId != '' , @UserId, USR.UserId)

 --to check for case of Per User order details in the same procedure  
 ELSE 
  SELECT USR.UserId,
    PRD.ProductName,
    [dbo].[MyFunc] (PRD.ProductPrice, PRD.ProductQuantity) AS TotalPrice,
    [dbo].[MyFunc] (PRD.ProductPrice, PRD.ProductQuantity) * @amountdeduct AS DiscountGain,
    [dbo].[MyFunc] (PRD.ProductPrice, PRD.ProductQuantity) * (1 - @amountdeduct ) AS OrderAmount
  FROM usertable USR
    INNER JOIN Product PRD ON PRD.UserId = USR.UserId
  WHERE USR.UserId = IIF (@UserId != '' , @UserId, USR.UserId)
END

EXECUTE [dbo].[calculation] 2, 0.5 ,'User4'